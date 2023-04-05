import React from 'react';
import { Questions, StartQuiz } from './components'
import './App.css'

function App() {
	const [quizIsStarted, setQuizIsStarted] = React.useState(false);

	return (
		<div className="app-quizical">
			<div className='blob green'></div>
			{quizIsStarted ? <Questions /> : <StartQuiz onClick={() => setQuizIsStarted(true)} />}
			<div className='blob yellow'></div>
		</div>
	)
}

export default App
