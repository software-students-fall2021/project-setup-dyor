import * as React from "react";
import axios from "axios";
import NewsTile from "../../components/NewsTile/newsTile";
import "./newsPage.css";

var coins = [];
var articles = {};
let allImages = [];

export default function NewsPage() {
  const [isLoading, setLoading] = React.useState(true);
  const [getImages, setgetImages] = React.useState(true);

  const getArticles = async () => {
    if (Object.keys(articles).length === 0) {
      await axios
        .get("/news")
        .then((res) => {
          articles = res.data;
          coins = Object.keys(articles);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    if (Object.keys(articles).length !== 0) setLoading(false);
  };

  const getImagesAPI = async () => {
    if (allImages.length === 0) {
      await axios
        .get("/news/images")
        .then((res) => {
          allImages = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (allImages.length !== 0) {
      setgetImages(false);
    }
  };

  React.useEffect(() => {
    getArticles();
    getImagesAPI();
  }, []);

  return (
    <>
      {!isLoading && !getImages && (
        <div className='newspage'>
          {coins.map((coin, index) => (
            <NewsTile
              key={index}
              coin={coin}
              images={allImages}
              number={2}
              articleTiles={articles[coin]}
            />
          ))}
        </div>
      )}
    </>
  );
}
