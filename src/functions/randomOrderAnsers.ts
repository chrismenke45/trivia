import { APIQuestion } from "../models";

const randomOrderAnswers = (question: APIQuestion): string[] => {
    let incorrectAnswers: string[] = question.incorrect_answers.slice()
    if (incorrectAnswers.length === 1 && (incorrectAnswers[0] === 'True' || incorrectAnswers[0] === 'False')) {
        incorrectAnswers = ["True", "False"]
    } else {
        const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1))
        incorrectAnswers.splice(randomIndex, 0, question.correct_answer)
    }
    return incorrectAnswers
}

export default randomOrderAnswers