export interface QuizType {
	response_code: number
	results: QuestionType[]
}

export interface QuestionType {
	category: string
	type: string,
	difficulty: string,
	question: string,
	correct_answer: string,
	incorrect_answers: string[]
}

export interface ForamtedQuestionType {
	question: string,
	correct_answer: string,
	incorrect_answers: string[],
	selected_answer: string | null,
	answers: string[],
	checked: boolean
}