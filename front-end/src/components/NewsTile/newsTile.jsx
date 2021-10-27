import * as React from 'react';
import DropDownMenu from '../DropDownMenu/drop_down_menu';
import Article from '../Article/article'
import './newsTile.css'

const options = [1,2,3,4,5,6,7,8,9];
  
export default function NewsTile({articleTiles, coin, number}) {
    const [articles, setArticles] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [num, setNum] = React.useState(number);

    const updateArticles = () => {
        if (articleTiles !==undefined && articleTiles.length !== 0 && articles.length !== num ){
            setArticles(articleTiles.slice(0, num))
        }
        if(articleTiles !==undefined && isLoading) 
            setIsLoading(false);
        
    }

    React.useEffect(() =>{
        updateArticles();
    },[num, articles])

    React.useEffect(() =>{
        updateArticles();
    },[])
    

    return (<>
        {!isLoading && <div className="news">
                <div className="news_content">
                    <div className="news_header">
                        <div className="news_type">
                            <h3 className="news_title">
                                {coin}
                            </h3>
                            <span id="news_dropdown">
                                <DropDownMenu selectedValue={num} label="Articles"
                                set={setNum} options= {options} className="dropdown_menu"/>
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