import React, { FC } from 'react';
import { QuestionsProps } from '.';
import { Question } from './Question';
import { useFetch } from '../../hooks';
import type { ForamtedQuestionType, QuestionType, QuizType } from '../../types';

const styles = {
	button: {
		minWidth: '192px'
	},
	footer: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	h5: {
		width: '100%',
		fontSize: '0.875em',
		lineHeight: '1em',
		fontWeight: '500',
	}
}

export const Questions: FC<QuestionsProps> = (props) => {
	const [hasCheckedAnswers, sethasCheckedAnswers] = React.useState(false);
	const [quizData, setQuizData] = React.useState<ForamtedQuestionType[]>([]);
	const { data, loading, error } = useFetch<QuizType>('https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple');

	React.useEffect(() => {
		console.log("useEffect");

		if (!loading && data) {
			console.log("useEffect with data");
			setQuizData(formatQestions(data.results));
		}

	}, [data]);

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

	function hadleCheck() {
		console.log("checkHandle");

	}

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error...</div>;
	if (!quizData.length) return <div>There is no data...</div>;

	return <div {...props} className="container">
		{quizData.map((questionlist, index) => (
			<Question key={questionlist.question} onClick={handleClickAnswer} {...questionlist} />
		))}
		<footer style={styles.footer}>
			<h5 style={styles.h5}>You scored 3/5 correct answers</h5>
			<button onClick={hadleCheck} type='button' title="Questions" style={styles.button}>Check answers</button>
		</footer>
	</div>;
};
