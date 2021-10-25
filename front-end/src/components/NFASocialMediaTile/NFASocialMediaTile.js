import React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import "./NFASocialMedia.css";
export default function NFASocialMediaTile(props) {
  return (
    <Box>
      <Paper variant="outlined" className="">
        <article className="article_content">
          <div className="">
            <h4 className="">
              <a href={props.url} target="blank">
                {props.title}
              </a>
            </h4>
            <h5 className="">{props.author}</h5>
            <p className="">{props.description}</p>
          </div>
        </article>
      </Paper>
    </Box>
  );
}
