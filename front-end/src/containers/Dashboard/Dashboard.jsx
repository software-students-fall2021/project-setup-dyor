import * as React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={1}
    >
      <item>
        <Typography color="primary" variant="h4">
          Dashboard
        </Typography>
      </item>
    </Stack>
  );
}
