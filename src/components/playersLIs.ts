const playersLIs = (playerArray: string[]):HTMLLIElement[] => {
    return playerArray.map(player => {
        let li: HTMLLIElement= document.createElement("li")
        let span: HTMLSpanElement = document.createElement("span")
        let div: HTMLDivElement = document.createElement("div")
        span.innerText = player
        div.appendChild(span)
        div.insertAdjacentHTML('beforeend',`<i class="fa fa-times cursor-pointer"></i>`)
        div.classList.add("w-full")
        div.classList.add("flex")
        div.classList.add("justify-between")
        div.classList.add("items-center")
        li.appendChild(div)
        li.classList.add("w-full")
        return li
    })
}
export default playersLIs