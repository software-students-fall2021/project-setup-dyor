import React, { useState } from "react";
import { Button, Stack, Textfield } from "@mui/material";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
                <Textfield
                    fullWidth
                    variant="outlined"
                    id="email"
                    label="Email Address"
                    value={userInput.email}
                    onChange={handleInputChange}
                ></Textfield>
            </item>
            <item>
                <Textfield
                    fullWidth
                    variant="outlined"
                    id="password"
                    label="Password"
                    value={userInput.password}
                    onChange={handleInputChange}
                ></Textfield>
            </item>
            <item>
                <Link to="/dashboard">
                    <Button color="primary">Submit</Button>
                </Link>
            </item>
        </Stack>
    );
};

export default LoginPage;
