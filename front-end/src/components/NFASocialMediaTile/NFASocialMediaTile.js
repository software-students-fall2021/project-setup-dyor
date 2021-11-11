import React from "react";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import "./NFASocialMedia.css";

export default function NFASocialMediaTile({media, article }) {
  function parseHtml(description) { 
    if (description.length > 300) {
      description = description.substr(0, description.lastIndexOf(' ', 300));
      description += " ..."
    }
    return { __html: description };
  }

  const post = media === 0 ? article.data : article;

  return (
    <Box>
      <Paper variant="outlined" className="">
        <article className="article_content">
          <div className="">
            <h4 className="">
              <a
                href={post.url ?? `https://www.reddit.com`}
                target="blank"
              >
                {post.title ?? post.name}
              </a>
            </h4>
            <h5 className="">@{post.username ?? post.author}</h5>
            <p
              className="post"
              dangerouslySetInnerHTML={parseHtml(
                post.tweet ?? post.selftext ?? post.selftext_html
              )}
            />
          </div>
        </article>
      </Paper>
    </Box>
  );
}
