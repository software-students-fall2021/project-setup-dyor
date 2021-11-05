import { useState, useEffect } from "react";
import NFASocialMediaTile from "../NFASocialMediaTile/NFASocialMediaTile";
import { Stack } from "@mui/material";
import "./NFASocialMedia.css";

import ShowMoreText from "react-show-more-text";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function NFASocialMedia({ posts }) {
  const [articles, setArticles] = useState([]);
  const [num, setNum] = useState(3);
  const [isloading, setLoading] = useState(true);
  console.log("Called here")

  useEffect(() => {
    console.log("called")
    if (posts !== undefined && posts.length !== 0 && articles.length !== num) {
      setArticles(posts.slice(0, num));
    }
    if (posts !== undefined && isloading) setLoading(false);
  }, []);

  // Readmore Feature
  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setNum(num + 3)
    setExpand(!expand);
  };

  return (
    <>
      <Stack
        sx={{ padding: "5%" }}
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={0.5}>
        <div>
          {articles.map((post) => (
            <div>Desmond</div>
          ))}
        </div>
        <div>
          {/* <ShowMoreText
            lines={3}
            more={<ExpandMoreIcon />}
            less={<ExpandLessIcon />}
            onClick={onClick}
            expanded={expand}
            width={100}>
            {articles.map((post) => (
              <NFASocialMediaTile article={post} />
            ))}
          </ShowMoreText> */}
        </div>
      </Stack>
    </>
  );
}
