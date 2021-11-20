import React, { useState } from "react";
import { IconButton, Box, Button, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import style from "./LoginPage.module.css";

const LoginPage = ({ loginHandler }) => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    if (event) {
      const { id, value } = event.target;
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        [id]: value,
      }));
    }
  };

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
          <Link className="link" to="/">
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
            <Typography className={style.greetings}>Welcome back!</Typography>
          </div>
          <item>
            <TextField
              fullWidth
              variant="outlined"
              id="email"
              label="Email Address"
              value={userInput.email}
              onChange={handleInputChange}
            ></TextField>
          </item>
          <item>
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              label="Password"
              value={userInput.password}
              onChange={handleInputChange}
            ></TextField>
          </item>
          <div className={style.centerButton}>
            <Link to="/dashboard">
              <Button
                variant="contained"
                color="primary"
                onClick={loginHandler}
              >
                Login
              </Button>
            </Link>
          </div>
        </Paper>
      </Stack>
    </div>
  );
};

export default LoginPage;
