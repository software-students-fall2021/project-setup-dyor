import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import style from "./SignupPage.module.css";
import axios from "axios";

const SignupPage = ({ loginHandler }) => {
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

  const augmentedLoginHandler = async () => {
    try {
      console.log("Input");
      console.log(userInput);
      const response = await axios.post(`users/signup`, userInput);
      // store the response data into the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
    } catch (err) {
      console.log(err);
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
                onClick={augmentedLoginHandler}
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

export default SignupPage;
