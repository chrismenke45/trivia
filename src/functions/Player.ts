import { QueryParamObjProp, oneOrZero } from "../models";

class Player {
    #name: string;
    #correctCount: number;
    #attemptedCount: number;
    constructor(name: string) {
        this.#name = name
        this.#correctCount =  0
        this.#attemptedCount = 0
    }
    get correctPercentage() {
        return this.#attemptedCount ? Math.round(this.#correctCount / this.#attemptedCount * 100) : 0
    }
    get name() {
        return this.#name
    }
    get correctCount() {
        return this.#correctCount
    }
    get attemptedCount() {
        return this.#attemptedCount
    }
    addCount (correct: oneOrZero) {
        this.#attemptedCount++
        this.#correctCount += correct
    }
}


export default Player