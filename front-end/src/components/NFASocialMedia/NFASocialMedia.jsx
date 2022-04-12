import { useState, useEffect } from "react";
import NFASocialMediaTile from "../NFASocialMediaTile/NFASocialMediaTile";
import { Stack, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./NFASocialMedia.css";

export default function NFASocialMedia({ media, posts }) {

  const [articles, setArticles] = useState([]);
  const [num, setNum] = useState(3);
  const [isloading, setLoading] = useState(true);

  //Read more feature
  function readMore(change) {
    if (change === "more") {
      setNum(num + 3);
    } else {
      setNum(3);
    }
  }

  useEffect(() => {
    if (articles.length !== num && posts !== undefined && posts.length !== 0) {
      setArticles(posts.slice(0, num));
    }
    if (articles.length !== 0 && isloading) setLoading(false);
  }, [num,posts,articles,isloading]);

  return (
    <>
      <Stack
        sx={{ padding: "5%" }}
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={0.5}
      >
        <div>
          {articles.map((post) => (
            <NFASocialMediaTile media={media} article={post} />
          ))}
        </div>
        <div className="readmore">
          <IconButton
            className="expandmore"
            edge="start"
            color="info"
            aria-label="menu"
            onClick={() => readMore("more")}
            sx={{ mr: 2 }}
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            className="expandless"
            edge="start"
            color="warning"
            aria-label="menu"
            onClick={() => readMore("less")}
            sx={{ mr: 2 }}
          >
            <ExpandLessIcon />
          </IconButton>
        </div>
      </Stack>
    </>
  );
}
