import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import "./WordCloud.css";
import { coinLabelDataURL } from "../../back-end_routes";

function WordCloud() {
  const [text, setText] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const canvasA = useRef(null);
  // const userID = "John";

  const userCoins = useMemo(() => coinData.map((a) => a.id), [coinData]);

  useEffect(() => {
    setText(userCoins);
    // getting the wordcloud
    const image = new Image();
    const canvas = canvasA.current.getContext("2d");

    axios
      .get("/nfa/wordcloud")
      .then((res) => {
        image.src = res.data;
      })
      .catch((err) => {
        return err;
      });

    image.onload = () => {
      canvas.drawImage(image, 0, 0);
    };
  }, []);

  return (
    <>
      <Paper variant="outlined" className="fill">
        <canvas ref={canvasA} width={310} height={150} />
      </Paper>
    </>
  );
}

export default WordCloud;
