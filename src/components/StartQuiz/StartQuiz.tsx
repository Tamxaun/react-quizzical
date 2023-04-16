import { FC } from 'react';
import { StartQuizProps } from '.';

const styles = {
	button: {
		minWidth: '192px'
	}
}

export const StartQuiz: FC<StartQuizProps> = (props) => {

	return <div {...props} className="container startQuiz">
		<h1>Quizzical</h1>
		<p>Some description if needed</p>
		<button onClick={props.onClick} type='button' style={styles.button}>Start quiz</button>
	</div>;
};
