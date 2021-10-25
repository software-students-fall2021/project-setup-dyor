import React from "react";
import NFASocialMediaTile from "../NFASocialMediaTile/NFASocialMediaTile";
import { Stack } from "@mui/material";
import "./NFASocialMedia.css";
export default function NFASocialMedia() {
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
        <item>
          <NFASocialMediaTile
            title="Hello"
            author="John Deo"
            description={a}
            url="adsf.html"
          />
        </item>
        <item>
          <NFASocialMediaTile
            title="Hello"
            author="John Deo"
            description={a}
            url="adsf.html"
          />
        </item>
        <item>
          <NFASocialMediaTile
            title="Hello"
            author="John Deo"
            description={a}
            url="adsf.html"
          />
        </item>
      </Stack>
    </>
  );
}
