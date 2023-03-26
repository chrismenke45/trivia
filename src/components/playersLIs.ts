import Player from "../functions/Player"

const playersLIs = (playerArray: Player[]):HTMLLIElement[] => {
    return playerArray.map(player => {
        let li: HTMLLIElement= document.createElement("li")
        li.innerText = player.name
        return li
    })
}
export default playersLIs