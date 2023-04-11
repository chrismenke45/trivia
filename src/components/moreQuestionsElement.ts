const moreQuestionsElement = (): HTMLDivElement => {
    let container: HTMLDivElement = document.createElement("div")
    container.classList.add("w-full", "col-center")
    let span: HTMLSpanElement = document.createElement("span")
    span.innerText = "Out of questions"
    let button : HTMLButtonElement = document.createElement("button")
    button.classList.add("moreQuestions")
    button.innerText = "Find more"
    container.append(span)
    container.append(button)
    return container
}

export default moreQuestionsElement