import React, { useState } from "react";
import axios from 'axios'
import { Button, Stack, TextField, Typography } from "@mui/material";
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

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/auth/login', userInput)
      .then(() => console.log('logged in'))
      .catch(err => console.log(err))
  }

  return (
    <div className={style.bgColor}>
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
                onClick={handleLogin}
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
