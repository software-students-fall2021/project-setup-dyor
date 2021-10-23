import * as React from 'react';
import {Box, AppBar, Toolbar, Typography} from '@mui/material';
import './topBar.css';


export default function TopBar() {
    return (
        <>
        <AppBar position="sticky" className="header">
        <Toolbar className="topBar">
            <Box className="logo">
                <Typography className = "logoTitle">
                    Logo
                </Typography>
            </Box>
        </Toolbar>
        </AppBar>
        </>
    );
}