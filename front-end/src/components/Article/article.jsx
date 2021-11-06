import * as React from "react";
import Paper from "@mui/material/Paper";
import "./article.css";

export default function Article({ article, images }) {
  function parseHtml(description) {
    return { __html: description };
  }

  let index = Math.floor(Math.random() * 19);
  return (
    <Paper variant='outlined' className='article_paper'>
      <article className='article_content'>
        <div className='image'>
          <img
            className='article_image'
            src={images[index]}
            alt='A crypto coin'
          />
        </div>
        <div className='description'>
          <h4 className='article_title'>
            <a href='https://www.coindesk.com/' target='blank'>
              {article.title}
            </a>
          </h4>
          <h5 className='extract_title'>{article.author}</h5>
          <p
            className='article_story'
            dangerouslySetInnerHTML={parseHtml(article.description)}
          />
        </div>
      </article>
    </Paper>
  );
}
