import React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import "./NFASocialMedia.css";

export default function NFASocialMediaTile({ post }) {
  console.log(post || "Nothing to show")
  return (
    <Box>
      <Paper variant='outlined' className=''>
        <article className='article_content'>
          <div className=''>
            <h4 className=''>
              <a href="https://google.com" target='blank'>
                {/* {props.title} */} Des
              </a>
            </h4>
            <h5 className=''>Author</h5>
            <p className=''>Description</p>
          </div>
        </article>
      </Paper>
    </Box>
  );
}
