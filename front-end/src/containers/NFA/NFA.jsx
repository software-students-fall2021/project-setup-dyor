import React from "react";

import Button from "@mui/material/Button";
import { Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TopBar from "../../components/TopBar/TopBar";
import WordCloud from "../../components/WordCloud/WordCloud";
import ComboBox from "../../components/Search/Search";
import NFASocialMedia from "../../components/NFASocialMedia/NFASocialMedia";

import styles from "./NFA.module.css";

export default function NFA() {
  const [media, setMedia] = React.useState(20);

  const handleChange = (event) => {
    setMedia(event.target.value);
  };

  return (
    <>
      <Box className={styles.nfaPageDiv}>
        <TopBar className="header"></TopBar>

        <Stack
          sx={{ padding: "5%" }}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
          <Typography weight="bold" color="primary" variant="h4">
            NFA
          </Typography>
          <item>
            <WordCloud />
          </item>

          <item>
            {/* The darker colored section. Contains: social media filter, search bar and the social media tiles */}
            <div className={styles.bgColor}>
              <div className={styles.displayInline}>
                <div>
                  <Typography weight="bold" color="primary" display="inline">
                    Social Media Filter
                  </Typography>
                </div>
                <div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={media}
                      onChange={handleChange}
                      label="Media"
                    >
                      <MenuItem value={10}>Facebook</MenuItem>
                      <MenuItem value={20}>Twitter</MenuItem>
                      <MenuItem value={30}>Google</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className={styles.displayInline}>
                {/* This is the search bar  */}
                <ComboBox />
              </div>
              {/* This is the social media tiles  */}
              <NFASocialMedia />

              <div className={styles.displayInline}>
                <Button variant="contained" size="small">
                  Sentiment Level Gauge
                </Button>
              </div>
            </div>
          </item>

          <item>
            <Typography weight="bold" color="primary" display="inline">
              Sentiment on your Portfolio
            </Typography>
          </item>
        </Stack>
      </Box>
    </>
  );
}
