import * as React from "react";
import axios from "axios";
import NewsTile from "../../components/NewsTile/newsTile";
import { CircularProgress } from "@mui/material";
import { userAssetDataURL } from "../../back-end_routes";
import "./newsPage.css";

var articles = {};
let allImages = [];

export default function NewsPage() {
  const userID = "John";
  const [isLoading, setLoading] = React.useState(true);
  const [getImages, setgetImages] = React.useState(true);
  const [userData, setUserData] = React.useState([]);

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
    //this will request the data pertaining to a particular user
    axios
      .request(userAssetDataURL, {
        params: {
          userID,
        },
      })
      .then((response) => {
        setUserData(() => response.data);
      })
      .catch((err) => {
        console.log("Get User Data Failed.");
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const getArticles = async () => {
      if (Object.keys(articles).length === 0) {
        await axios
          .get("/news")
          .then((res) => {
            articles = res.data;
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
      if (Object.keys(articles).length !== 0) setLoading(false);
    };
    getArticles();
    getImagesAPI();
  }, [userData]);

  return (
    <>
      {isLoading || getImages ? (
        <div className="circularProgress">
          <CircularProgress
            className="progressBar"
            size={100}
            thickness={2.0}
          />
        </div>
      ) : (
        <div className="newspage">
          {userData.map((data, index) => (
            <NewsTile
              key={index}
              coin={data.id}
              images={allImages}
              number={2}
              articleTiles={articles[data.id]}
            />
          ))}
        </div>
      )}
    </>
  );
}
