import "./styles/index.css";
import Fetcher from "./functions/Fetcher";
import Player from "./functions/Player";
import scoreDisplayLIs from "./components/scoreDisplayLIs";

const params = Object.fromEntries(  
    new URLSearchParams(window.location.search)
)
let players: Player[] = params["players"].split(",").map(name => new Player(name)) 
console.log(players)

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        let fetcher = new Fetcher()
        await fetcher.fetchToken()
        let playerLIElements: HTMLLIElement[] = scoreDisplayLIs(players, 0)
        playerLIElements.forEach(element => {
            document.querySelector("#playerSummaries").appendChild(element)
        })
    }
    buildPage()
})