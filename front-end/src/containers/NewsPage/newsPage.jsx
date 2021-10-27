import * as React from 'react'
import axios from 'axios'
import './newsPage.css'
import NewsTile from '../../components/NewsTile/newsTile';

const coins = ["Cryptocurrency","Bitcoin", "Ethereum", "Polkadot","Dogecoin", "Shiba"]
const articles = {}

export default function NewsPage() {
    const [isLoading, setLoading] = React.useState(true)

    const getArticles = async() => {
        for (let i=0; i<coins.length; ++i){
            const date = new Date("2021-10-25");
            console.log(date)
            const url = `https://newsapi.org/v2/everything?qInTitle=+${coins[i]}&from=${date}&language=en&sortBy=relevancy&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`
            await axios.get(url).then((res) => {
                articles[coins[i]] = res.data.articles
            }).catch((err) =>{
                if (err.response) {
                    console.log("Error response from API", err.response.status)
                } else if (err.request) {
                    console.log("No response from API", err.response.status)
                } else {
                    console.log("Crashed", err.response.status)
                }
            })
        }
        if(articles.Bitcoin !== undefined)
            setLoading(false)
    }

    React.useEffect(()=>{
        getArticles();
    },[])

    return (<>
        {!isLoading && <div className="newspage">
            {coins.map((coin, index) => (
                <NewsTile key={index} coin={coin} articleTiles= {articles[coin]} />
            ))}
        </div>}
        </>
    );
}

