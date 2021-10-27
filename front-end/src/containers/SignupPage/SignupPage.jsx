import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
        <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
        >
            <item>
                <Typography>Welcome back!</Typography>
            </item>
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
            <item>
                <Link to="/dashboard">
                    <Button color="primary" onClick={loginHandler}>
                        Signup
                    </Button>
                </Link>
            </item>
        </Stack>
    );
};

export default SignugPage;
