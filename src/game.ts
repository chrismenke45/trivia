import "./styles/index.css";
import Fetcher from "./classes/Fetcher";
import Player from "./classes/Player";
import scoreDisplayLIs from "./components/scoreDisplayLIs";
import { APIQuestion } from "./models"

const params = Object.fromEntries(  
    new URLSearchParams(window.location.search)
)
let players: Player[] = params["players"].split(",").map(name => new Player(name)) 
console.log(players)

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        let fetcher = new Fetcher()
        await fetcher.fetchToken()
        let data = await fetcher.fetchQuestions({"amount": 20})
        const questions: APIQuestion[] = data.results
        console.log(questions)
        let playerLIElements: HTMLLIElement[] = scoreDisplayLIs(players, 0)
        playerLIElements.forEach(element => {
            document.querySelector("#playerSummaries").appendChild(element)
        })
    }
    buildPage()
})