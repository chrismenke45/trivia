import "./styles/index.css";
import Fetcher from "./classes/Fetcher";
import categoryOptions from "./components/categoryOptions";
import { categoryProp } from "./models";
import playersLIs from "./components/playersLIs";

document.addEventListener("DOMContentLoaded", () => {
    const buildPage = async () => {
        let fetcher = new Fetcher()
        const categories: categoryProp[] = await fetcher.fetchCategories()
        const categoryOptionElements: HTMLOptionElement[] = categoryOptions(categories)
        categoryOptionElements.forEach(element => {
            document.querySelector("select").appendChild(element)
        })
        let players: string[] = []
        let addPlayerBtn: HTMLButtonElement = document.querySelector("#addPlayerBtn")
        addPlayerBtn.addEventListener("click", (e) => handleAddPlayer(e, players))
        document.querySelector("#playerInput").addEventListener("input", clearWarnings)
        document.querySelector("#playBtn").addEventListener("click", (e) => handlePlay(e, players))
    }
    buildPage()
})

const handleAddPlayer = (e: MouseEvent, players: string[]) => {
    e.preventDefault()
    let playerInput: HTMLInputElement = document.querySelector("#playerInput")
    if (playerInput.value.trim() === "") {
        clearWarnings()
        addWarning("Player names cannot be blank")
    } else if (players.some(player => player === playerInput.value.trim())) {
        clearWarnings()
        addWarning("Players cannot have the same name")
    } else if (players.length >= 4) {
        clearWarnings()
        addWarning("4 players maximum")
    } else {
        players.push(playerInput.value.trim())
        playerInput.value = ""
        let playersUL = document.querySelector("#playerList")
        playersUL.innerHTML = ""
        let playerLIElements: HTMLLIElement[] = playersLIs(players)
        playerLIElements.forEach(element => {
            playersUL.appendChild(element)
            element.lastChild.lastChild.addEventListener("click", (e) => removePlayer(e, players))
        })
    }
}
const clearWarnings = () => {
    document.querySelector('#warningList').innerHTML = ""
}
const addWarning = (warning: string) => {
    let warningLI = document.createElement("li")
    warningLI.innerHTML = warning
    document.querySelector('#warningList').appendChild(warningLI)
}
const handlePlay = (e: Event, players: string[]) => {
    e.preventDefault()
    if (players.length < 1) {
        clearWarnings()
        addWarning("You must add a player!")
    } else {
        const category: HTMLSelectElement = document.querySelector("#category")
        window.location.replace(`game.html?players=${players.join(',')}&category=${category.value}`);
    }
}
const removePlayer = (e: Event, players: string[]) => {
    if (e.currentTarget instanceof HTMLElement) {
        players.splice((Number(e.currentTarget.dataset.index)), 1)
        let playersUL = document.querySelector("#playerList")
        playersUL.innerHTML = ""
        let playerLIElements: HTMLLIElement[] = playersLIs(players)
        playerLIElements.forEach(element => {
            playersUL.appendChild(element)
            element.lastChild.lastChild.addEventListener("click", (e) => removePlayer(e, players))
        })
    }
}