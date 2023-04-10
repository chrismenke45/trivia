import "./styles/index.css";
import Fetcher from "./classes/Fetcher";
import Player from "./classes/Player";
import scoreDisplayLIs from "./components/scoreDisplayLIs";
import { APIQuestion, QueryParamObjProp } from "./models"
import askQuestionElement from "./components/askQuestionElement";

const params = Object.fromEntries(
    new URLSearchParams(window.location.search)
)
let players: Player[] = params["players"].split(",").map(name => new Player(name))
let currentQuestionIndex: number = 0

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        const questions: APIQuestion[] = await getQuestions(params, players.length)
        console.log(questions)
        updateUI(players, currentQuestionIndex, questions)
    }
    buildPage()
})

const updateScoreDisplay = (players: Player[], currentPlayerIndex?: number) => {
    console.log("update", currentPlayerIndex)
    let playerSummariesList: HTMLUListElement = document.querySelector("#playerSummaries")
    let playerLIElements: HTMLLIElement[] = scoreDisplayLIs(players, currentPlayerIndex)
    playerSummariesList.innerHTML = ""
    playerLIElements.forEach(element => {
        playerSummariesList.appendChild(element)
    })
}

const getQuestions = async (params: QueryParamObjProp, playerCount: number): Promise<APIQuestion[]> => {
    let fetcher = new Fetcher()
    await fetcher.fetchToken()
    let questionParams: QueryParamObjProp = { "amount": playerCount * 5 }
    Number(params["category"]) && Object.assign(questionParams, { "category": params["category"] })
    let data = await fetcher.fetchQuestions(questionParams)
    return data.results
}

const updateUI = (players: Player[], currentIndex: number, questions: APIQuestion[]) => {
    updateScoreDisplay(players, currentIndex % players.length)
    document.querySelectorAll(".answer").forEach(answer => {
        answer.removeEventListener("click", (e) => answerHandler(e, questions))
    })
    document.querySelector("main").innerHTML = ""
    document.querySelector("main").appendChild(askQuestionElement(questions[currentIndex]))
    document.querySelectorAll(".answer").forEach(answer => {
        answer.addEventListener("click", (e) => answerHandler(e, questions))
    })
}

const answerHandler = (e: Event, questions: APIQuestion[]) => {
    const button = e.target as HTMLElement;
    if (button.innerText === decodeURIComponent(questions[currentQuestionIndex].correct_answer)) {
        console.log("correct")
        players[currentQuestionIndex % players.length].addCount(1)
    } else {
        console.log("incorrect")
        players[currentQuestionIndex % players.length].addCount(0)
    }
    console.log(button.innerText, currentQuestionIndex)
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        updateUI(players, currentQuestionIndex, questions)
    } else {
        updateScoreDisplay(players)
        document.querySelector("main").innerHTML = "That's all the questions"
    }
    
}