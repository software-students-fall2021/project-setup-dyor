import * as React from 'react';
import DropDownMenu from '../DropDownMenu/drop_down_menu';
import Article from '../Article/article'
import axios from 'axios';
import './newsTile.css'

const options = [1,2,3,4,5,6,7,8,9];
let articleTiles = []

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

  
export default function NewsTile({news_type, sortBy}) {
    
    const temp_type = capitalize(news_type)

    const [articles, setArticles] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [num, setNum] = React.useState(2);

    const getArticles = async() => {
        const url = `https://newsapi.org/v2/everything?qInTitle=+${news_type}&from=2021-10-20&language=en&sortBy=${sortBy}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`
        const res = await axios.get(url)
        articleTiles = res.data.articles
        setArticles(articleTiles.slice(0,num))
    }

    const updateArticles = () => {
        if(articleTiles.length !== 0 && articles.length !== num ){
            setArticles(articleTiles.slice(0, num))
        }
        if(isLoading) 
            setIsLoading(false);
    }

    React.useEffect(() => {
        getArticles()
    }, [])

    React.useEffect(() =>{
        updateArticles();
    },[num, articles])
    

    return (<>
        {!isLoading && <div className="news">
                <div className="news_content">
                    <div className="news_header">
                        <div className="news_type">
                            <h3 className="news_title">
                                {temp_type}
                            </h3>
                            <span id="news_dropdown">
                                <DropDownMenu selectedValue={num} setArticleNum={setNum} options= {options} className="dropdown_menu"/>
                            </span> 
                        </div> 
                    </div>
                    {articles.map((article) => (
                        <Article 
                            key = {article.title}
                            article={article}
                        />
                    ))}
                </div>
            </div>}
        </>
    );
}