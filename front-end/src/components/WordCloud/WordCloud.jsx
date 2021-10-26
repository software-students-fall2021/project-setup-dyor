import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import "./WordCloud.css";

function WordCloud() {
  const [wordCloud, setWordCloud] = useState();
  const getWordCloud = async () => {
    const url = `https://quickchart.io/wordcloud?text=This girl is on fire.&format=png`;
    const res = await axios.get(url);
    setWordCloud(res);
    console.log("The returned image", res);
  };

  useEffect(() => {
    getWordCloud();
  }, []);
  const imgSrc = `https://picsum.photos/300/200`;
  return (
    <>
      <Paper variant="outlined" className="fill">
        <img alt="random for now" src={imgSrc} className="wordCloudImage" />
      </Paper>
    </>
  );
}

export default WordCloud;
