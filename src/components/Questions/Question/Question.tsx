import { FC } from 'react';
import { QuestionProps } from '.';
import styles from './Question.module.css';

export const Question: FC<QuestionProps> = (props) => {

	function handleChangeAnswer(question: string, answer: string) {
		if (props.checked) return;

		props.onClick(question, answer);
	}

	const answersElement = props.answers.map((answer) => {
		let status = null;

		if (props.checked) {
			if (props.correct_answer === answer) {
				status = styles.isCorrect;
			} else {
				status = styles.isWrong
			}
		} else status = null;

		return (
			<li key={answer}>
				<input onChange={() => handleChangeAnswer(props.question, answer)} type="radio" aria-current={props.selected_answer === answer} name={props.question} id={answer} value={answer} checked={props.selected_answer === answer} disabled={props.checked} />
				<label className={`${styles.answer} ${status ? status : null}`} htmlFor={answer}><span>{answer}</span></label>
			</li>
		)
	})

	return (
		<article className={`${styles.question} ${props.selected_answer && styles.isSelected}`}>
			<section>
				<h3 className={styles.questionTitle}>{props.question}</h3>
				<ul className={styles.answers}>{answersElement}</ul>
			</section>
		</article>
	)
};