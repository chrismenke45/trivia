import randomOrderAnswers from "../functions/randomOrderAnsers"
import { APIQuestion } from "../models"

const askQuestionElement = (question: APIQuestion):HTMLElement => {
    let article: HTMLElement = document.createElement("article")
    let p: HTMLParagraphElement = document.createElement("p")
    let ul: HTMLUListElement = document.createElement("ul")
    article.classList.add("col-center")
    ul.classList.add("grid", "grid-cols-2")
    question.question
    p.innerText = decodeURIComponent(question.question)
    article.appendChild(p)
    const answers: string[] = randomOrderAnswers(question)
    answers.forEach(answer => {
        let li: HTMLLIElement = document.createElement("li")
        let button: HTMLButtonElement = document.createElement("button")
        button.innerText = decodeURIComponent(answer)
        li.append(button)
        ul.append(li)
    })
    article.append(ul)
    return article
}
export default askQuestionElement