import { Questions, StartQuiz } from './components'
import './App.css'

function App() {

	return (
		<div className="App">
			<div className='blob green'></div>
			<Questions />
			<StartQuiz />
			<div className='blob yellow'></div>
		</div>
	)
}

export default App
