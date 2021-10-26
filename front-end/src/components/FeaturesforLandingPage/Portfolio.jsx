import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core'
import ImageCard from './ImageCard';
import features from './Features';
import useWindowPosition from '../hookForLandingPage/useWindowPostion';
import Zoom from 'react-reveal/Zoom'
import Bounce from 'react-reveal/Bounce';
// import front_image from "/public/front_elem.png"

const useStyles = makeStyles((theme) => ({
    root:{
        minheight:"100vh",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
    },
    toGo:{
        minheight:"90vh",
        justifyContent: "center",
        alignItems: "center",
    },
    topcard:{
        minheight:"100vh",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
    },

    root_about_us:{
        justifyContent: "center",
        alignItems: "center",
        height:"80vh",
        // maxWidth: 645,
        paddingTop: "200px",
        // background: 'rgba(0,0,0,0.3)',
        margin: '5px',
    },
    title:{
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "2rem",
        color: "#fff",
    },
    description:{
        fontSize: "1rem",
        color: "#ddd",
        textAlign: "center",
        margin: "15px",
    },

}));



export const Portfolio = () => {
    const classes = useStyles();
    return (
        <div className= {classes.root}>

            <div className = {classes.root_about_us} id = "About_us">
                <Bounce>
                    <h1 className = {classes.title}>About Us</h1>
                </Bounce>
                <Bounce>
                    <p className = {classes.description}>
                    Allow user to add Stock and Crypto to their Wallet and display their cumulative profit/loss thus far through Graphs. Allow user to add Stock and Crypto to their Wallet and display their cumulative profit/loss thus far through Graphs. 
                    Allow user to add Stock and Crypto to their Wallet and display their cumulative profit/loss thus far through Graphs.
                    </p>
                </Bounce>
            </div>
            <div className = {classes.topcard} id = 'Portfolio'>
                <Zoom>
                    <ImageCard feature = {features[0]}/>
                </Zoom>
            </div>
    
            <div className = {classes.toGo} id = "NFA">
            <Zoom>
                <ImageCard feature = {features[1]}/>
            </Zoom>
            </div>
            <div className={classes.toGo} id = "SA">
            <Zoom>
                <ImageCard feature = {features[2]}/>
            </Zoom>
            </div>
            <div className={classes.toGo} id = "News">
            <Zoom>
                <ImageCard feature = {features[3]}/>
            </Zoom>
            </div>

        </div>
    )
}
