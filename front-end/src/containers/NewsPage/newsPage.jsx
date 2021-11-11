import * as React from "react";
import axios from "axios";
import NewsTile from "../../components/NewsTile/newsTile";
import { CircularProgress } from "@mui/material";
import { userAssetDataURL } from "../../back-end_routes";
import "./newsPage.css";

var articles = {};

export default function NewsPage() {
  const userID = "John";
  const [isLoading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState([]);

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
  }, [userData]);

  return (
    <>
      {isLoading ? (
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
              number={2}
              data={articles[data.id]}
            />
          ))}
        </div>
      )}
    </>
  );
}
