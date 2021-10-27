import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import style from "./SignupPage.module.css";

import "./SignupPage";
const SignugPage = ({ loginHandler }) => {
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
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Paper elevation={2} className={style.cardBox}>
          <div className={style.centerButton}>
            <Typography className={style.greetings}>Welcome!</Typography>
          </div>
          <div>
            <TextField
              fullWidth
              variant="outlined"
              id="email"
              label="Email Address"
              value={userInput.email}
              onChange={handleInputChange}
            ></TextField>
          </div>
          <div>
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              label="Password"
              value={userInput.password}
              onChange={handleInputChange}
            ></TextField>
          </div>
          <div className={style.centerButton}>
            <Link to="/dashboard">
              <Button
                variant="contained"
                color="primary"
                onClick={loginHandler}
              >
                Signup
              </Button>
            </Link>
          </div>
        </Paper>
      </Stack>
    </div>
  );
};

export default SignugPage;
