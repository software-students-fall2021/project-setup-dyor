import React, { useState } from "react";
import NFASocialMediaTile from "../NFASocialMediaTile/NFASocialMediaTile";
import { Stack } from "@mui/material";
import "./NFASocialMedia.css";

import ShowMoreText from "react-show-more-text";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function NFASocialMedia() {
  // Readmore Feature
  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setExpand(!expand);
  };

  // VAlues
  let a =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodt non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
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
          <NFASocialMediaTile
            title="Hello"
            author="John Deo"
            description={a}
            url="adsf.html"
          />
        </div>
        <div>
          <NFASocialMediaTile
            title="Hello"
            author="John Deo"
            description={a}
            url="adsf.html"
          />
        </div>
        <div>
          <ShowMoreText
            lines={2}
            more={<ExpandMoreIcon />}
            less={<ExpandLessIcon />}
            onClick={onClick}
            expanded={expand}
            width={100}
          >
            <div>
              <NFASocialMediaTile
                title="Hello"
                author="John Deo"
                description={a}
                url="adsf.html"
              />
            </div>
            <div>
              <NFASocialMediaTile
                title="Hello"
                author="John Deo"
                description={a}
                url="adsf.html"
              />
            </div>
          </ShowMoreText>
        </div>
      </Stack>
    </>
  );
}
