import * as React from 'react'
import axios from 'axios'
import './newsPage.css'
import NewsTile from '../../components/NewsTile/newsTile';

const coins = ["Cryptocurrency","Bitcoin", "Ethereum", "Polkadot","Dogecoin", "Shiba"]
const articles = {}
let allImages = []

export default function NewsPage() {
    const [isLoading, setLoading] = React.useState(true)
    const [getImages, setgetImages] = React.useState(true)

    const getArticles = async() => {
        // const date = new Date("2021-10-26");
        const url = "https://my.api.mockaroo.com/articles.json?key=9371d6e0"
        // const url = `https://newsapi.org/v2/everything?qInTitle=+${coins[i]}&from=${date}&language=en&sortBy=relevancy&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`
        
        await axios.get(url).then((res) => {
            let j= 0;
            for (let i=0; i<coins.length; ++i){
                articles[coins[i]] = res.data.slice(j, j+20);
                j = j+20;
            }
        }).catch((err) =>{
            if (err.response) {
                console.log("Error response from API", err.response.status)
            } else if (err.request) {
                console.log("No response from API", err.response.status)
            } else {
                console.log("Crashed", err.response.status)
            }
        })
        
        if(articles.Bitcoin !== undefined)
            setLoading(false)
    }
    const getImagesAPI = async() => {
        const images = "https://picsum.photos/v2/list?page=2&limit=20"
        await axios.get(images).then((res) => {
            for(let i=0; i<20; ++i){
                allImages.push(res.data[i].download_url)
            }
        }).catch((err) =>{
            if (err.response) {
                console.log("Error response from API", err.response.status)
            } else if (err.request) {
                console.log("No response from API", err.response.status)
            } 
        })
        if(allImages.length !== 0){
            // console.log(allImages)
            setgetImages(false)
        }
            
    }

    React.useEffect(()=>{
        getArticles();
        getImagesAPI();
    },[])

    return (<>
        {!isLoading && !getImages && <div className="newspage">
            {coins.map((coin, index) => (
                <NewsTile key={index} coin={coin} images={allImages} number={2} articleTiles= {articles[coin]} />
            ))}
        </div>}
        </>
    );
}

