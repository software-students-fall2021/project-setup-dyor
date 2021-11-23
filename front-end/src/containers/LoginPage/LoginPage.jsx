import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import { Paper } from "@mui/material";
import style from "./LoginPage.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { makeStyles } from "@mui/styles";

// import Footer from "../../components/Footer/footer";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Back_1.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const LoginPage = ({ loginHandler }) => {
  const [response, setResponse] = useState({}); // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("");
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [wrongPassword, setWrongPassword] = useState(false); 

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
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.email}`);
      localStorage.setItem("token", response.token);
    } 
  }, [response]);

  const augmentedLoginHandler = async () => {
    try {
      const response = await axios.post(`users/signin`, userInput);
      // store the response data into the data state variable
      setErrorMessage("Login successful");
      setResponse(response.data);
    } catch (err) {
      console.log(err);
      // request failed... user entered invalid credentials
      setWrongPassword(true);
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

  const classes = useStyles();


  if (response.success) {
    loginHandler();
    return <Redirect to="/dashboard" />;
  } else
    return (
      <div className={classes.root}>
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
        <div className={style.errorText} style={{color: response.success ? "green" : "red" }}>
          <Typography>{errorMessage}</Typography>
        </div>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
          marginTop = "30%"
        >
          <Paper elevation={2} className={style.cardBox}>
            <div className={style.centerButton}>
              <Typography className={style.greetings}>
                Welcome back!
              </Typography>
            </div>
              <TextField
                className={style.textfield}
                margin="normal"
                fullWidth
                required={true}
                error = {wrongPassword}
                type="email"
                variant="outlined"
                id="email"
                label="Email Address"
                value={userInput.email}
                onChange={handleInputChange}
                InputLabelProps = {{className : style.textfield__label}}

              ></TextField>
              <TextField
                fullWidth
                className={style.textfield}
                required={true}
                error = {wrongPassword}
                type="password"
                autoComplete="current-password"
                variant="outlined"
                id="password"
                label="Password"
                value={userInput.password}
                onChange={handleInputChange}
                InputLabelProps = {{className : style.textfield__label}}
              ></TextField>
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
