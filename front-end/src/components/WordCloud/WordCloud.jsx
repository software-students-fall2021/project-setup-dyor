import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import "./WordCloud.css";

function WordCloud() {
  const canvasA = useRef(null);

  useEffect(() => {
    // getting the wordcloud
    const image = new Image();
    const canvas = canvasA.current.getContext("2d");

    axios
      .get("/nfa/wordcloud")
      .then((res) => {
        image.src = res.data["data"];
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
