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
console.log(players)

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        let fetcher = new Fetcher()
        await fetcher.fetchToken()
        let questionParams: QueryParamObjProp = {"amount": 20}
        Number(params["category"]) && Object.assign(questionParams, {"category": params["category"]})
        let data = await fetcher.fetchQuestions(questionParams)
        const questions: APIQuestion[] = data.results
        console.log(questions)
        let playerLIElements: HTMLLIElement[] = scoreDisplayLIs(players, 0)
        playerLIElements.forEach(element => {
            document.querySelector("#playerSummaries").appendChild(element)
        })
        document.querySelector("main").appendChild(askQuestionElement(questions[0]))
    }
    buildPage()
})