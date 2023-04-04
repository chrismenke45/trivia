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

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        const questions: APIQuestion[] = await getQuestions(params, players.length)
        console.log(questions)
        questions.forEach((question, index) => {
            updateScoreDisplay(players, index)
            document.querySelector("main").appendChild(askQuestionElement(question))
        }
        )
    }
    buildPage()
})

const updateScoreDisplay = (players: Player[], currentPlayerIndex: number) => {
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