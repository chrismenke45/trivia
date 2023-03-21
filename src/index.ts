import "./styles/index.css";
import Fetcher from "./functions/Fetcher";
const main = async () => {
    const fetcher = new Fetcher()
    const data = await fetcher.fetchData()
    console.log(data)
    console.log("yeehaw");

};

main();
