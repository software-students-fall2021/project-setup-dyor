import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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