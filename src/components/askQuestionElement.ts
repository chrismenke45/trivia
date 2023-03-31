import randomOrderAnswers from "../functions/randomOrderAnsers"
import { APIQuestion } from "../models"

const askQuestionElement = (question: APIQuestion):HTMLElement => {
    let article: HTMLElement = document.createElement("article")
    let p: HTMLParagraphElement = document.createElement("p")
    let ul: HTMLUListElement = document.createElement("ul")
    question.question
    p.innerText = decodeURIComponent(question.question)
    article.appendChild(p)
    const answers: string[] = randomOrderAnswers(question)
    answers.forEach(answer => {
        let li: HTMLLIElement = document.createElement("li")
        li.innerText = decodeURIComponent(answer)
        ul.append(li)
    })
    article.append(ul)
    return article
}
export default askQuestionElement