import * as React from "react";
import { Stack, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";
import NewsTile from "../../components/NewsTile/newsTile";

let articles = [];
let allImages = [];

export default function DashboardPage() {
  const [isLoading, setLoading] = React.useState(true);
  const [getImages, setgetImages] = React.useState(true);

  React.useEffect(() => {
    const getArticles = async () => {
      if (articles.length === 0) {
        await axios
          .get("/news/crypto")
          .then((res) => {
            articles = res.data;
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
      if (articles.length !== 0 && isLoading) setLoading(false);
    };

    const getImagesAPI = async () => {
      if (allImages.length === 0) {
        await axios
          .get("/news/images")
          .then((res) => {
            allImages = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (allImages.length !== 0 && getImages) {
        setgetImages(false);
      }
    };

    getArticles();
    getImagesAPI();
  }, [isLoading, getImages]);

  return (
    <>
      {!isLoading && !getImages && (
        <Stack
          direction='column'
          justifyContent='space-evenly'
          alignItems='stretch'
          spacing={2}
          bgcolor='rgb(230, 248, 246)'>
          <item>
            <Typography
              color='primary'
              variant='h4'
              className={styles.headingDash}>
              Dashboard
            </Typography>
          </item>
          <item>
            <Paper elevation={2} className={styles.cardBox}>
              <Typography variant='h5'>Welcome back!</Typography>
              <Typography variant='h6'>What's New in v0.1 Beta</Typography>
              <ol className={styles.orderedList}>
                <li>
                  <Typography variant='body2'>
                    Now track your assets DYOR Portfolio
                  </Typography>
                </li>
                <li>
                  <Typography variant='body2'>
                    Start your own research with NEWS
                  </Typography>
                </li>
                <li>
                  <Typography variant='body2'>
                    We have a settings page now, the gear icon
                  </Typography>
                </li>
                <li>
                  <Typography variant='body2'>
                    You can now change your region in settings
                  </Typography>
                </li>
              </ol>
            </Paper>
          </item>
          <item>
            <Paper elevation={2} className={styles.cardBox}>
              <DailyGraph></DailyGraph>
            </Paper>
          </item>
          <item>
            <Paper elevation={2} className={styles.cardBox}>
              <NewsTile
                coin='Crypto News'
                number={4}
                articleTiles={articles}
                images={allImages}
              />
            </Paper>
          </item>
        </Stack>
      )}
    </>
  );
}
