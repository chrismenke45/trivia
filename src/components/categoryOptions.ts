import { categoryProp } from "../models"

const categoryOptions = (categoryArray: categoryProp[]):HTMLOptionElement[] => {
    return categoryArray.map(category => {
        let option: HTMLOptionElement = document.createElement("option")
        option.setAttribute("value", category.id.toString())
        option.innerText = category.name
        return option
    })
}
export default categoryOptions