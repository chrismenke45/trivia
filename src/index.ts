import "./styles/index.css";
import Fetcher from "./functions/Fetcher";
const main = async () => {
    const fetcher = new Fetcher()
    const data1 = await fetcher.fetchToken()
    console.log(data1)
    const data2 = await fetcher.fetchCategories()
    console.log(data2)
    console.log("yeehaw");

};

main();
