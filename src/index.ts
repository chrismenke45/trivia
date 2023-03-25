import "./styles/index.css";
import Fetcher from "./functions/Fetcher";
import Player from "./functions/Player";
import categoryOptions from "./components/categoryOptions";
import { categoryProp } from "./models";

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
        const categoryElements: HTMLOptionElement[] = categoryOptions(categories)
        categoryElements.forEach(element => {
            document.querySelector("select").appendChild(element)
        })
        let players: Player[] = []
        let addPlayerBtn: HTMLButtonElement = document.querySelector("#addPlayerBtn")
        addPlayerBtn.addEventListener("click", (e) => {
            e.preventDefault()
            let playerInput: HTMLInputElement = document.querySelector("#playerInput")
            if (playerInput.value.trim() === "") {
                alert("name cant be blank")
            } else if (players.some(player => player.name === playerInput.value.trim())) {
                alert("cant use same name")
            } else {
                players.push(new Player(playerInput.value.trim()))
                playerInput.value = ""
            }
            console.log(players)
        })
    }
    buildPage()
})



main();
