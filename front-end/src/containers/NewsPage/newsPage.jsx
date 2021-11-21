import * as React from "react";
import axios from "axios";
import NewsTile from "../../components/NewsTile/newsTile";
import { CircularProgress } from "@mui/material";
import { userAssetDataURL } from "../../back-end_routes";
import "./newsPage.css";

export default function NewsPage() {
  const [articles, setArticles] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    //this will request the data pertaining to a particular user
    axios
      .request(userAssetDataURL, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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
      await axios
        .get("/news")
        .then((res) => {
          setArticles(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getArticles();
  }, [userData]);

  React.useEffect(() => {
    if (Object.keys(articles).length !== 0) {
      setLoading(false);
    }
  }, [articles]);

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
              data={articles[data.id.toLowerCase()]}
            />
          ))}
        </div>
      )}
    </>
  );
}
