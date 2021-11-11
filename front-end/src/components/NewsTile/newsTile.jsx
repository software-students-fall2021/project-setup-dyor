import * as React from "react";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Article from "../Article/article";
import "./newsTile.css";

export default function NewsTile({ data, coin, number }) {

  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [num, setNum] = React.useState(number);

    //Read more feature
  function readMore(change) {
    if (change === "more") {
      setNum(num + 1);
    } else {
      setNum(2);
    }
  }

  React.useEffect(() => {
    if (
      data !== undefined &&
      data.length !== 0 &&
      articles.length !== num &&
      num < data.length
    ) {
      setArticles(data.slice(0, num));
    }
    if (data !== undefined) setIsLoading(false);
  }, [num, data, articles]);

  return (
    <>
      {!isLoading && (
        <div className="news">
          <div className="news_content">
            <div className="news_header">
              <h3 className="news_title">{coin.toUpperCase()}</h3>
            </div>
            {articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
          <div className="readmore">
            <IconButton
              className="expandmore"
              edge="start"
              color="info"
              aria-label="menu"
              onClick={() => readMore("more")}
              sx={{ mr: 2 }}
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton
              className="expandless"
              edge="start"
              color="warning"
              aria-label="menu"
              onClick={() => readMore("less")}
              sx={{ mr: 2 }}
            >
              <ExpandLessIcon />
            </IconButton>
        </div>
        </div>
      )}
    </>
  );
}
