import Player from "../classes/Player"

const incrementActivePlayer = (playersArr: Player[], currentActiveIndex: number): number => {
    currentActiveIndex++
    return currentActiveIndex < playersArr.length ? currentActiveIndex : 0

}
export default incrementActivePlayer