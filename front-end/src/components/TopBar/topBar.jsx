import * as React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './topBar.css';


export default function TopBar() {
    return (
        <>
        <AppBar className="header">
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