import React from "react";
import { IconButton, Box, Button, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import style from "../LoginPage/LoginPage.module.css";

const ResetPassword = () => {
  return (
    <div className={style.bgColor}>
      <Box className={style.header}>
        <IconButton
          className={style.headerArrow}
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Link className="link" to="/settings">
            <ArrowBackIcon />
          </Link>
        </IconButton>
      </Box>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Paper elevation={2} className={style.cardBox}>
          <div className={style.centerButton}>
            <Typography className={style.greetings}>Reset Password</Typography>
          </div>
          <item>
            <TextField
              fullWidth
              variant="outlined"
              id="email"
              label="Current Password"
              //   value={}
              //   onChange={}
            ></TextField>
          </item>
          <item>
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              label="New Password"
              //   value={}
              //   onChange={}
            ></TextField>
          </item>
          <item>
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              label="Confirm Password"
              //   value={}
              //   onChange={}
            ></TextField>
          </item>
          <div className={style.centerButton}>
            <Link to="/settings">
              <Button
                variant="contained"
                color="primary"
                // onClick={}
              >
                Reset Password
              </Button>
            </Link>
          </div>
        </Paper>
      </Stack>
    </div>
  );
};

export default ResetPassword;
