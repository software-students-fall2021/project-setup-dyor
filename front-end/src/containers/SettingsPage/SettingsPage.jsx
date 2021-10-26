import React from "react";
import { Stack, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import styles from "./SettingsPage.module.css";

export function SettingsPage() {
  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={2}
      bgcolor="rgb(230, 248, 246)"
    >
      <item>
        <Typography
          weight="bolder"
          color="primary"
          variant="h4"
          className={styles.heading}
        >
          Settings
        </Typography>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem}>
          Email
        </Paper>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem}>
          World
        </Paper>
      </item>
    </Stack>
  );
}
