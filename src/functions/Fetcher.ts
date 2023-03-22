interface QueryParamObjProp { 
    [key: string]: string | number; 
}

class Fetcher {
    options: RequestInit;
    baseURL: string;
    token: string | null;
    constructor() {
        this.options = {
            method: "GET",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        }
        this.baseURL = "https://opentdb.com"
    }
    buildFormData(formInfoArray: string[][]): void {
        let data = new FormData()
        formInfoArray.forEach(formInfo => {
            if (formInfo[1]) { data.append(formInfo[0], formInfo[1]) }
        })
        this.options.body = data
    }
    #generateQueryParams(values: QueryParamObjProp): string {
        let queryStr = "?"
        for (const [index, [key, value]] of Object.entries(Object.entries(values))) {
            if (Number(index) !== 0) {
                queryStr += "&"
            }
            queryStr += `${key}=${value}`
        }
        return queryStr
    }
    async fetchData(): Promise<any> {
        try {
            let url: string = 'https://the-trivia-api.com/api/questions?limit=20&categories=science,history'
            const res = await fetch(url, this.options)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            return data
        }
        catch (err) {
            console.error(err)
        }
        
    }
    async fetchToken(): Promise<any> {
        try {
            let url: string = `${this.baseURL}/api_token.php${this.#generateQueryParams({"command": "request"})}`
            const res = await fetch(url, this.options)
            if (!res.ok) {
                console.error(`Error recieving token from ${this.baseURL}`)
            }
            const data = await res.json()
            this.token =  data.token
        }
        catch (err) {
            console.error(err)
        }
        
    }
}

const generateQueryParams = (values: QueryParamObjProp): string => {
    let queryStr = "?"
    for (const [index, [key, value]] of Object.entries(Object.entries(values))) {
        if (Number(index) !== 0) {
            queryStr += "&"
        }
        queryStr += `${key}=${value}`
    }
    return queryStr
}


export default Fetcher