import { FC } from 'react';
import DOMPurify from 'dompurify';
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

		const answerHtmlString = answer;
		const sanitizedAnswer = DOMPurify.sanitize(answerHtmlString);

		return (
			<li key={answer}>
				<input onChange={() => handleChangeAnswer(props.question, answer)} type="radio" aria-current={props.selected_answer === answer} name={props.question} id={answer} value={answer} checked={props.selected_answer === answer} disabled={props.checked} />
				<label className={`${styles.answer} ${status ? status : null}`} htmlFor={answer}><span dangerouslySetInnerHTML={{ __html: sanitizedAnswer }} /></label>
			</li>
		)
	})

	const questionHtmlString = props.question;
	const sanitizedQuestion = DOMPurify.sanitize(questionHtmlString);

	return (
		<article className={`${styles.question} ${props.selected_answer && styles.isSelected} ${props.hasRunChecked && !props.selected_answer ? ` ${styles.hasChecked}` : null}`}>
			<section>
				<h3 className={styles.questionTitle} dangerouslySetInnerHTML={{ __html: sanitizedQuestion }} />
				<ul className={styles.answers}>{answersElement}</ul>
			</section>
		</article>
	)
};