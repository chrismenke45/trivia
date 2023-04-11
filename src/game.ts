import "./styles/index.css";
import Fetcher from "./classes/Fetcher";
import Player from "./classes/Player";
import scoreDisplayLIs from "./components/scoreDisplayLIs";
import { APIQuestion, QueryParamObjProp } from "./models"
import askQuestionElement from "./components/askQuestionElement";
import moreQuestionsElement from "./components/moreQuestionsElement";

const params = Object.fromEntries(
    new URLSearchParams(window.location.search)
)
let globalPlayers: Player[] = params["players"].split(",").map(name => new Player(name))
let currentQuestionIndex: number = 0
let globalFetcher = new Fetcher()
let globalQuestions: APIQuestion[] = []

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        await getToken()
        globalQuestions = await getQuestions(params, globalPlayers.length)
        updateUI(globalPlayers, currentQuestionIndex, globalQuestions)
    }
    buildPage()
})

const updateScoreDisplay = (players: Player[], currentPlayerIndex?: number) => {
    let playerSummariesList: HTMLUListElement = document.querySelector("#playerSummaries")
    let playerLIElements: HTMLLIElement[] = scoreDisplayLIs(players, currentPlayerIndex)
    playerSummariesList.innerHTML = ""
    playerLIElements.forEach(element => {
        playerSummariesList.appendChild(element)
    })
}

const getToken = async () => {
    await globalFetcher.fetchToken()
}
const getQuestions = async (params: QueryParamObjProp, playerCount: number): Promise<APIQuestion[]> => {
    let questionParams: QueryParamObjProp = { "amount": playerCount * 5 }
    Number(params["category"]) && Object.assign(questionParams, { "category": params["category"] })
    params["difficulty"] !== "all" && Object.assign(questionParams, { "difficulty": params["difficulty"] })
    let data = await globalFetcher.fetchQuestions(questionParams)
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
        globalPlayers[currentQuestionIndex % globalPlayers.length].addCount(1)
    } else {
        globalPlayers[currentQuestionIndex % globalPlayers.length].addCount(0)
    }
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        updateUI(globalPlayers, currentQuestionIndex, questions)
    } else {
        updateScoreDisplay(globalPlayers)
        document.querySelector("main").innerHTML = ""
        document.querySelector("main").append(moreQuestionsElement())
        document.querySelector("button.moreQuestions").addEventListener("click", moreQuestionsHandler)
    }
    
}

const moreQuestionsHandler = async (e: Event) => {
    globalQuestions = await getQuestions(params, globalPlayers.length)
    document.querySelector("button.moreQuestions").removeEventListener("click", moreQuestionsHandler)
    if (globalQuestions.length === 0) {
        let main: HTMLElement = document.querySelector("main")
        main.innerHTML = ""
        main.innerText = "Sorry, no more questions could be found"
    } else {
        currentQuestionIndex = 0
        updateUI(globalPlayers, currentQuestionIndex, globalQuestions)
    }  
}