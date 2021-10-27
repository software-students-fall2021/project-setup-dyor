import * as React from "react";
import { Stack, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";
import NewsTile from '../../components/NewsTile/newsTile';

let articles = []

export default function DashboardPage() {
  const [isLoading, setLoading] = React.useState(true)

  const getArticles = async() => {
    const date = new Date("2021-10-26");
    const url = `https://newsapi.org/v2/everything?qInTitle=+cryptocurrency&from=${date}&language=en&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`
    await axios.get(url).then((res) => {
      articles = res.data.articles
    }).catch((err) =>{
      if (err.response) {
          console.log("Error response from API", err.response.status)
      } else if (err.request) {
          console.log("No response from API", err.response.status)
      } else {
          console.log("Crashed", err.response.status)
      }
    })
    if(articles!==undefined && articles.length !== 0)
      setLoading(false)
  }

  React.useEffect(()=>{
    getArticles();
  },[])



  return (
    <>{!isLoading &&
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={2}
      bgcolor="rgb(230, 248, 246)"
    >
      <item>
        <Typography color="primary" variant="h4" className={styles.headingDash}>
          Dashboard
        </Typography>
      </item>
      <item>
        <Paper elevation={2} className={styles.cardBox}>
          <Typography variant="h5">Welcome back!</Typography>
          <Typography variant="h6">What's New in v0.1 Beta</Typography>
          <ol className={styles.orderedList}>
            <li>
              <Typography variant="body2">
                Now track your assets DYOR Portfolio
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Start your own research with NEWS
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                We have a settings page now, the gear icon
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
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
          <NewsTile coin="Crypto News" number={4} articleTiles= {articles} />
        </Paper>
      </item>
    </Stack>
    }</>
  );
}
