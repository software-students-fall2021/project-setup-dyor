import React, { useState, useEffect } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import { Paper } from "@mui/material";
import style from "./LoginPage.module.css";
import axios from "axios";

const LoginPage = ({ loginHandler }) => {
  const [response, setResponse] = useState({}); // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("");
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

  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    console.log(response);
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.email}`);
      localStorage.setItem("token", response.token);
    }
  }, [response]);

  const augmentedLoginHandler = async () => {
    try {
      console.log("Input");
      console.log(userInput);
      const response = await axios.post(`users/signin`, userInput);
      // store the response data into the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
    } catch (err) {
      console.log(err);
      // request failed... user entered invalid credentials
      setErrorMessage("You entered invalid credentials.");
    }
  };

  // const handleSubmit = async (e) => {
  //   // prevent the HTML form from actually submitting... we use React's javascript code instead
  //   e.preventDefault();

  //   try {
  //     const requestData = {
  //       email: e.target.email.value, // gets the value of the field in the submitted form with name='email'
  //       password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
  //     };

  //     const response = await axios.post(`users/signin`, requestData);
  //     // store the response data into the data state variable
  //     console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
  //     setResponse(response.data);
  //   } catch (err) {
  //     // request failed... user entered invalid credentials
  //     setErrorMessage("You entered invalid credentials.");
  //   }
  // };

  if (response.success) {
    loginHandler();
    return <Redirect to="/dashboard" />;
  } else
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
              <Typography className={style.greetings}>
                {errorMessage || "Welcome back!"}
              </Typography>
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
                label="password"
                value={userInput.password}
                onChange={handleInputChange}
              ></TextField>
            </item>
            <div className={style.centerButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={augmentedLoginHandler}
              >
                Login
              </Button>
            </div>
            {/* {errorMessage} */}
            {/* <form onSubmit={handleSubmit}>
              {
                //handle error condition
              }

              <label>email: </label>
              <input type="text" name="email" placeholder="email" />
              <br />
              <br />
              <label>Password: </label>
              <input type="password" name="password" placeholder="password" />
              <br />
              <br />
              <input type="submit" value="Log In" />
            </form> */}
          </Paper>
        </Stack>
      </div>
    );
};

export default LoginPage;
