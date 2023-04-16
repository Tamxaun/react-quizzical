import React, { FC } from 'react';
import { QuestionsProps } from '.';
import { Question } from './Question';
import { useFetch } from '../../hooks';
import type { ForamtedQuestionType, QuestionType, QuizType } from '../../types';
import styles from './Questions.module.css';

export const Questions: FC<QuestionsProps> = (props) => {
	const [hasRunChecked, setHasRunChecked] = React.useState(false);
	const [hasCheckedAnswers, setHasCheckedAnswers] = React.useState(false);
	const [quizData, setQuizData] = React.useState<ForamtedQuestionType[]>([]);
	const [correctAnswers, setCorrectAnswers] = React.useState(0);
	const { data, loading, error, refetch } = useFetch<QuizType>('https://opentdb.com/api.php?amount=5&type=multiple');

	React.useEffect(() => {
		console.log("useEffect");

		if (!loading && data) {
			setHasRunChecked(false);

			console.log("useEffect with data");
			setQuizData(formatQestions(data.results));
		}

	}, [loading]);

	function formatQestions(questions: QuestionType[]) {
		return questions.map((question) => {
			return {
				question: question.question,
				correct_answer: question.correct_answer,
				incorrect_answers: question.incorrect_answers,
				selected_answer: null,
				answers: shuffledAnswers(question.correct_answer, question.incorrect_answers),
				checked: false
			}
		})
	}

	function shuffledAnswers(str: string, arr: string[]) {
		return [str, ...arr].sort(() => Math.random() - 0.5);
	}

	function handleClickAnswer(question: string, answer: string) {
		setQuizData((prevQuestions) => prevQuestions.map((prevQuestion) => prevQuestion.question === question ? { ...prevQuestion, selected_answer: answer } : prevQuestion));
	}

	function handleClickCheck() {
		console.log("checkHandle stage 0");

		setHasRunChecked(true);

		if (quizData.some((item) => item.selected_answer === null)) return;

		console.log("checkHandle stage 1");

		setQuizData((prevQuestions) => prevQuestions.map((prevQuestion) => {
			return {
				...prevQuestion,
				checked: true
			}
		}));

		console.log("checkHandle stage 2");

		quizData.forEach((question) => {
			if (question.selected_answer === question.correct_answer) {
				setCorrectAnswers(prevCount => prevCount + 1);
			}
		})

		setHasCheckedAnswers(true);
	}

	function handleClickReplay() {
		setHasCheckedAnswers(false);
		setCorrectAnswers(0);
		refetch();
	}

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error...</div>;
	if (!quizData.length) return <div>There is no data...</div>;

	return <div {...props} className="container">
		<section>
			<h2>Questions about — <span style={{ color: '#FF5200' }}>{data?.results[0].category}</span></h2>
			<h3 className={styles.h3}>Difficulty: <span className={styles[data?.results[0]?.difficulty || 'easy']}>{data?.results[0].difficulty}</span></h3>
			{quizData.map((questionlist) => (
				<Question key={questionlist.question} onClick={handleClickAnswer} {...questionlist} hasRunChecked={hasRunChecked} />
			))}
		</section>
		<div className={styles.action}>
			{hasCheckedAnswers && <h5 className={styles.h5}>You scored {correctAnswers}/5 correct answers</h5>}
			<button className={styles.btn} onClick={hasCheckedAnswers ? handleClickReplay : handleClickCheck} type='button' title={hasCheckedAnswers ? 'Play again' : 'Check answers'} >{hasCheckedAnswers ? 'Play again' : 'Check answers'}</button>
		</div>
	</div>;
};
