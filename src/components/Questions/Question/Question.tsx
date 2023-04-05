import { FC } from 'react';
import { QuestionProps } from '.';
import styles from './Question.module.css';

export const Question: FC<QuestionProps> = (props) => {

	function handleChangeAnswer(question: string, answer: string) {
		if (props.selected_answer) return;

		props.onClick(question, answer);
	}

	return (
		<article className={styles.question}>
			<h3 className={styles.questionTitle}>{props.question}</h3>
			<ul className={styles.answers}>
				{props.answers.map((answer) => {
					return (
						<li key={answer}>
							<input onChange={() => handleChangeAnswer(props.question, answer)} type="radio" aria-current={props.selected_answer === answer} name={props.question} id={answer} value={answer} checked={props.selected_answer === answer} disabled={props.checked} />
							<label className={styles.answer} htmlFor={answer}>{answer}</label>
						</li>
					)
				})}
			</ul>
		</article>
	)
};