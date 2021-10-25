import * as React from 'react'
import axios from 'axios'
import TopBar from '../../components/TopBar/TopBar'
import Footer from '../../components/Footer/footer'
import './newsPage.css'
import NewsTile from '../../components/NewsTile/newsTile';

const coins = ["Cryptocurrency","Bitcoin", "Ethereum", "Polkadot"]
const articles = {}

export default function NewsPage() {
    const [isLoading, setLoading] = React.useState(true)

    const getArticles = async() => {
        console.log("called")
        for (let i=0; i<coins.length; ++i){
            const url = `https://newsapi.org/v2/everything?qInTitle=+${coins[i]}&from=2021-10-20&language=en&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`
            const res = await axios.get(url)
            articles[coins[i]] = res.data.articles
        }
        if(articles.Bitcoin !== undefined)
            setLoading(false)
    }

    React.useEffect(()=>{
        getArticles();
    },[])

    return (<>
        {!isLoading && <div className="newspage">
            <TopBar className="header"></TopBar>
            {coins.map((coin, index) => (
                <NewsTile key={index} coin={coin} articleTiles= {articles[coin]} />
            ))}
            <Footer className="footer" />
        </div>}
        </>
    );
}

