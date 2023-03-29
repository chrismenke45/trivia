import Player from "../classes/Player"

const scoreDisplayLIs = (playerArray: Player[], activeIndex: number):HTMLLIElement[] => {
    return playerArray.map((player, index) => {
        let li: HTMLLIElement= document.createElement("li")
        let nameSpan: HTMLSpanElement = document.createElement("span")
        nameSpan.innerText = player.name
        let percentSpan: HTMLSpanElement = document.createElement("span")
        percentSpan.innerText = `${player.correctPercentage}%`
        li.classList.add("flex", "justify-between", "mx-1", "p-2", "basis-24", "bg-red-100", "rounded", "border", "border-black")
        li.appendChild(nameSpan)
        li.appendChild(percentSpan)
        return li
    })
}
export default scoreDisplayLIs