class Fetcher {
    options: RequestInit;
    constructor() {
        this.options = {
            method: "GET",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        }
    }
    buildFormData(formInfoArray: string[][]): void {
        let data = new FormData()
        formInfoArray.forEach(formInfo => {
            if (formInfo[1]) { data.append(formInfo[0], formInfo[1]) }
        })
        this.options.body = data
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
}


export default Fetcher