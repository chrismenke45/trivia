export type oneOrZero = 0 | 1 

export interface categoryProp {
    id: number;
    name:string;
}

export interface QueryParamObjProp { 
    [key: string]: string | number; 
}