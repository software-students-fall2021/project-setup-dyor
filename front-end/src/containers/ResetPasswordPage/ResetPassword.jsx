import React from "react";
import { useState, useEffect } from "react";
import { IconButton, Box, Button, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import axios from 'axios';
import style from "./ResetPassword.module.css";
// import style from "../LoginPage/LoginPage.module.css";

const ResetPassword = () => {

  const [response, setResponse] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [userInput, setUserInput] = useState({ currentPassword: "", password: "", confirmPassword: "" });

  const handleInputChange = (event) => {
    if (event) {
      const { id, value } = event.target;
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        [id]: value,
      }));
    }
  };

  const validate = async () => {
    if (userInput.password !== userInput.confirmPassword) {
      setErrorMessage("Passwords don't match");
      setWrongPassword(true);
    } else {
      const user = { email: localStorage.getItem('email'), password: userInput.password, currentPassword: userInput.currentPassword };
      const res = await axios.post('users/resetPassword', user);
      setResponse(res.data.success);
    }
  };

  useEffect(() => {
    if (response) {
      setUserInput({ currentPassword: "", password: "", confirmPassword: "" });
      setErrorMessage("Password reset successful");
    }
  }, [response]);

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
      <div className={style.errorText} style={{color: response ? "green" : "red" }}>
        <Typography>{errorMessage}</Typography>
      </div>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Paper elevation={2} className={style.cardBox}>
          <div className={style.centerButton}>
            <Typography className={style.greetings}>
              Reset Password
            </Typography>
          </div>
          <item className={style.field}>
            <TextField
              className={style.textfield}
              fullWidth
              type="password"
              required={true}
              variant="outlined"
              id="currentPassword"
              label="Current Password"
              value={userInput.currentPassword}
              onChange={handleInputChange}
            ></TextField>
          </item>
          <item className={style.field}>
            <TextField
              fullWidth
              required={true}
              type="password"
              error = {wrongPassword}
              variant="outlined"
              id="password"
              label="New Password"
              value={userInput.password}
              onChange={handleInputChange}
            ></TextField>
          </item>
          <item className={style.field}>
            <TextField
              fullWidth
              type="password"
              required={true}
              variant="outlined"
              id="confirmPassword"
              label="Confirm Password"
              error = {wrongPassword}
              value={userInput.confirmPassword}
              onChange={handleInputChange}
            ></TextField>
          </item>
          <div className={style.centerButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={validate}
              >
                Reset Password
              </Button>
          </div>
        </Paper>
      </Stack>
    </div>
  );
};

export default ResetPassword;
