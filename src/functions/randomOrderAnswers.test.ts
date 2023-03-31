import randomOrderAnswers from "./randomOrderAnsers";
import { describe, expect, test, jest } from '@jest/globals';
import { APIQuestion } from "../models";

const question1: APIQuestion = {
    category: "Entertainment%3A%20Video%20Games",
    correct_answer: "True",
    difficulty: "medium",
    incorrect_answers: ['False'],
    question: "In%20Rocket%20League%2C%20you%20can%20play%20Basketball.",
    type: "boolean"
}

test('random Order answer works with boolean true value', () => {
    expect(randomOrderAnswers(question1)).toEqual(["True", "False"]);
});

const question2: APIQuestion = {
    category: "Entertainment%3A%20Video%20Games",
    correct_answer: "False",
    difficulty: "medium",
    incorrect_answers: ['True'],
    question: "In%20Rocket%20League%2C%20you%20can%20play%20Cricket.",
    type: "boolean"
}

test('random Order answer works with boolean false value', () => {
    expect(randomOrderAnswers(question2)).toEqual(["True", "False"]);
});

const question3: APIQuestion = {
    "category": "Geography",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which%20country%20claims%20ownership%20of%20the%20disputed%20state%20Kosovo%3F",
    "correct_answer": "Serbia",
    "incorrect_answers": [
        "Croatia",
        "Albania",
        "Macedonia"
    ]
}

test('random Order returns all answers multiple choice', () => {
    expect(randomOrderAnswers(question3).sort()).toEqual(["Croatia", "Albania", "Macedonia", "Serbia"].sort());
});

test('random Order returns multiples answers order based off random number', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
    expect(randomOrderAnswers(question3)).toEqual(["Serbia", "Croatia", "Albania", "Macedonia"]);
    jest.spyOn(global.Math, 'random').mockRestore();
});
test('random Order returns multiples answers order based off random number', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3);
    expect(randomOrderAnswers(question3)).toEqual(["Croatia", "Serbia", "Albania", "Macedonia"]);
    jest.spyOn(global.Math, 'random').mockRestore();
});
test('random Order returns multiples answers order based off random number', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
    expect(randomOrderAnswers(question3)).toEqual(["Croatia", "Albania", "Serbia", "Macedonia"]);
    jest.spyOn(global.Math, 'random').mockRestore();
});
test('random Order returns multiples answers order based off random number', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
    expect(randomOrderAnswers(question3)).toEqual(["Croatia", "Albania", "Macedonia", "Serbia"]);
    jest.spyOn(global.Math, 'random').mockRestore();
});