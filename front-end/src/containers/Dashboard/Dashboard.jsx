import * as React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import styles from "./Dashboard.module.css";
import axios from "axios";
// import { DailyGraph } from "../../components/DailyGraph/DailyGraph";
import NewsTile from "../../components/NewsTile/newsTile";

export default function DashboardPage() {
  const [isLoading, setLoading] = React.useState(true);
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    const getArticles = async () => {
      await axios
        .get("/news/cryptocurrency")
        .then((res) => {
          setArticles(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getArticles();
  }, []);

  React.useEffect(() => {
    if (articles.length !== 0 && isLoading) setLoading(false);
  }, [isLoading, articles]);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={2}
        bgcolor="rgb(230, 248, 246)"
      >
        <item>
          <Typography
            color="primary"
            variant="h4"
            className={styles.headingDash}
          >
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
        <item className={styles.circularProgress}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Paper elevation={2} className={styles.cardBox}>
              <NewsTile coin="Crypto News" number={4} data={articles} />
            </Paper>
          )}
        </item>
      </Stack>
    </>
  );
}
