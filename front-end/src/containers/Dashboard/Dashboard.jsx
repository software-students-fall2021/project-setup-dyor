import * as React from "react";
import { Stack, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import styles from "./Dashboard.module.css";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";

export default function DashboardPage() {
  return (
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
    </Stack>
  );
}
