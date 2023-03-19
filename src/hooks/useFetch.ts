import { useEffect, useReducer, useRef } from "react";

interface State<T> {
	data?: T;
	error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
	| { type: 'loading' }
	| { type: 'fetched'; payload: T }
	| { type: 'error'; payload: Error };

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
	const cache = useRef<Cache<T>>({});
	const cancelRequest = useRef<boolean>(false); // Used to prevent state update if the component unmounted

	const initialState: State<T> = {
		error: undefined,
		data: undefined,
	}

	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case 'loading':
				return { ...initialState };
			case 'fetched':
				return { ...initialState, data: action.payload };
			case 'error':
				return { ...initialState, error: action.payload };
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {
		// if url is not defined return nothing
		if (!url) return;

		// Flag to keep track of whether the component is mounted or not
		let isMouned = true;

		// Reset the cancelRequest flag
		cancelRequest.current = false;

		// Create a function to handle the fetch request
		const fetchData = async () => {
			// Dispatch the loading action to the reducer state
			dispatch({ type: 'loading' });

			// If data is already in the cache, return it
			if (cache.current[url]) {
				// Dispatch the fetched action to the reducer state and return the data from the cache
				dispatch({ type: 'fetched', payload: cache.current[url] });
				return;
			}

			try {
				// Fetch the data from the url
				const response = await fetch(url, options);

				// If the response is not ok, throw an error
				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, received ${response.status}`);
				}

				// Get the data from the response
				const data = await response.json();

				// Add the data to the cache
				cache.current[url] = data;

				// Update state if the component is mounted
				if (isMouned && !cancelRequest.current) {
					// Dispatch the fetched action to the reducer state and return the data
					dispatch({ type: 'fetched', payload: data });
				}

			} catch (error) {
				// Update state if the component is mounted
				if (isMouned && !cancelRequest.current) {
					// Dispatch the error action to the reducer state and return the error
					dispatch({ type: 'error', payload: error as Error });
				}
			}
		}

		// Call the fetchData function adn adding void to shows that fetchData doesnt return anything
		void fetchData();

		// Return a Cleanup function to set caneelRequest flag to true when the component unmounts
		return () => {
			cancelRequest.current = true;
			isMouned = false;
		}
	}, [url, options]);

	return state;

}