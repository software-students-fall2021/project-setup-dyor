import React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import "./NFASocialMedia.css";

export default function NFASocialMediaTile({ article }) {
  function parseHtml(description) {
    return { __html: description };
  }

  return (
    <Box>
      <Paper variant="outlined" className="">
        <article className="article_content">
          <div className="">
            <h4 className="">
              <a
                href={article.url ?? "https://www.coindesk.com/"}
                target="blank"
              >
                {article.name ?? article.title}
              </a>
            </h4>
            <h5 className="">@{article.username ?? article.author}</h5>
            <p
              className=""
              dangerouslySetInnerHTML={parseHtml(
                article.tweet ?? article.description,
              )}
            />
          </div>
        </article>
      </Paper>
    </Box>
  );
}
