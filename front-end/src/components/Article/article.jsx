import * as React from 'react'
import Paper from '@mui/material/Paper'
import './article.css'

export default function Article({article}){

    return (
        <Paper variant="outlined" className="article_paper">
            <article className="article_content">
                    <div className="image">
                        <img className= "article_image"
                            src= {article.urlToImage}
                            alt="A crypto coin"
                        />
                    </div>
                    <div className="description">
                        <h4 className="article_title"><a href={article.url} target="blank">{article.title}</a></h4>
                        <h5 className="extract_title">{article.author}</h5>
                        <p className="article_story"> 
                            {article.description}
                        </p>
                    </div>
            </article>
        </Paper>
    );
}

