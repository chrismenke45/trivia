import "./styles/index.css";
import Fetcher from "./functions/Fetcher";
import Player from "./functions/Player";
import categoryOptions from "./components/categoryOptions";
import { categoryProp } from "./models";
import playersLIs from "./components/playersLIs";

const main = async () => {
    const fetcher = new Fetcher()
    const data1 = await fetcher.fetchToken()
    console.log(data1)
    const data2 = await fetcher.fetchCategories()
    console.log(data2)
    console.log("yeehaw");

};

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        let fetcher = new Fetcher()
        const categories: categoryProp[] = await fetcher.fetchCategories()
        const categoryOptionElements: HTMLOptionElement[] = categoryOptions(categories)
        categoryOptionElements.forEach(element => {
            document.querySelector("select").appendChild(element)
        })
        let players: Player[] = []
        let addPlayerBtn: HTMLButtonElement = document.querySelector("#addPlayerBtn")
        addPlayerBtn.addEventListener("click", (e) => handleAddPlayer(e, players))
    }
    buildPage()
})



main();

const handleAddPlayer = (e: MouseEvent, players: Player[]) => {
    e.preventDefault()
    let playerInput: HTMLInputElement = document.querySelector("#playerInput")
    if (playerInput.value.trim() === "") {
        let warningLI = document.createElement("li")
        warningLI.innerHTML = "name cant be blank"
        document.querySelector('#warningList').appendChild(warningLI)
    } else if (players.some(player => player.name === playerInput.value.trim())) {
        let warningLI = document.createElement("li")
        warningLI.innerHTML = "cant use same name"
        document.querySelector('#warningList').appendChild(warningLI)
    } else {
        players.push(new Player(playerInput.value.trim()))
        playerInput.value = ""
        let playersUL = document.querySelector("#playerList")
        playersUL.innerHTML = ""
        let playerLIElements: HTMLLIElement[] = playersLIs(players)
        playerLIElements.forEach(element => {
            playersUL.appendChild(element)
        })
    }
    console.log(players)
}
