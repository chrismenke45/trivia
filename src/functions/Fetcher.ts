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
    // buildFormData(formInfoArray: string[][]): void {
    //     let data = new FormData()
    //     formInfoArray.forEach(formInfo => {
    //         if (formInfo[1]) { data.append(formInfo[0], formInfo[1]) }
    //     })
    //     this.options.body = data
    // }
    #generateQueryParams(values: QueryParamObjProp): string {
        if (values) {
            let queryStr = "?"
            for (const [index, [key, value]] of Object.entries(Object.entries(values))) {
                if (Number(index) !== 0) {
                    queryStr += "&"
                }
                queryStr += `${key}=${value}`
            }
            return queryStr
        } else {
            return ""
        }
        
    }
    async #basicFetch(path: string) {
        let url: string = this.baseURL + path
        try {
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
    async fetchQuestions(params: QueryParamObjProp): Promise<any> {
        return await this.#basicFetch(`/api.php${this.#generateQueryParams(params)}`)
    }
    async fetchCategories(): Promise<any> {
        return await this.#basicFetch(`/api_category.php`)
    }
    async fetchToken(): Promise<any> {
        const data = await this.#basicFetch(`/api_token.php${this.#generateQueryParams({"command": "request"})}`) 
        this.token = data.token 
    }
}


export default Fetcher