const playersLIs = (playerArray: string[]):HTMLLIElement[] => {
    return playerArray.map(player => {
        let li: HTMLLIElement= document.createElement("li")
        li.innerText = player
        return li
    })
}
export default playersLIs