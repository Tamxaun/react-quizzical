import { ForamtedQuestionType } from "../../../types";

export interface QuestionProps extends ForamtedQuestionType {
	onClick: (question: string, answer: string) => void;
	hasRunChecked: boolean
};
