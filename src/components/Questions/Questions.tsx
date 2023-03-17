import { FC } from 'react';
import { QuestionsProps } from '.';

const styles = {
	button: {
		minWidth: '192px'
	}
}

export const Questions: FC<QuestionsProps> = (props) => {
	return <div {...props} className="container">
		<h1>Quizzical</h1>
		<p>Some description if needed</p>
		<button type='button' style={styles.button}>Start quiz</button>
	</div>;
};
