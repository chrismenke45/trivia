export type oneOrZero = 0 | 1 

export interface categoryProp {
    id: number;
    name:string;
}

export interface QueryParamObjProp { 
    [key: string]: string | number; 
}

export interface APIQuestion {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[]
    question: string;
    type: string;
}