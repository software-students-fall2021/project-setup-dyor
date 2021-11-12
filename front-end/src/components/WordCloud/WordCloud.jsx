import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
import Paper from "@mui/material/Paper";
import "./WordCloud.css";

function WordCloud(props) {
  const canvasA = useRef(null);

  useEffect(() => {
    // getting the wordcloud
    const image = new Image();
    const canvas = canvasA.current.getContext("2d");

    image.src = props.wcData;

    image.onload = () => {
      canvas.fillStyle = "white";
      canvas.fillRect(0, 0, 310, 150);
      canvas.drawImage(image, 0, 0);
    };
  }, [props.wcData]);
  // console.log(props.wcData);
  return (
    <>
      <Paper variant="outlined" className="fill">
        <canvas ref={canvasA} width={310} height={150} />
      </Paper>
    </>
  );
}

export default WordCloud;
