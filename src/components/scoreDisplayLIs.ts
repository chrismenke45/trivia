import Player from "../classes/Player"

const scoreDisplayLIs = (playerArray: Player[], activeIndex?: number): HTMLLIElement[] => {
    return playerArray.map((player, index) => {
        let li: HTMLLIElement = document.createElement("li")
        let nameSpan: HTMLSpanElement = document.createElement("span")
        nameSpan.innerText = player.name
        let percentSpan: HTMLSpanElement = document.createElement("span")
        percentSpan.innerText = `${player.correctPercentage}%`
        li.classList.add("sm:flex", "justify-between", "mx-1", "p-1", "basis-24", "rounded", "border", "border-black")
        li.classList.add(activeIndex !== undefined && activeIndex === index ? "bg-green-300" : "bg-red-100")
        li.classList.add(activeIndex !== undefined && activeIndex === index ? "flex" : "hidden")
        li.appendChild(nameSpan)
        li.appendChild(percentSpan)
        return li
    })
}
export default scoreDisplayLIs