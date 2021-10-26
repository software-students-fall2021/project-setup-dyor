import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, makeStyles } from '@material-ui/core'
import { Collapse } from '@material-ui/core';


const useStyles = makeStyles({
    root:{
        maxWidth: 645,
        background: 'rgba(0,0,0,0.3)',
        margin: '5px',
        borderRadius: "15px",
    },
    media: {
        height: 440,
    },
    title:{
        fontWeight: "bold",
        fontSize: "2rem",
        color: "#fff",
    },
    description:{
        fontSize: "1rem",
        color: "#ddd",
    },
    setter:{
        margin: '25px',
    },
});

export default function ImageCard({feature, checked}) {
    const classes = useStyles();
  return (
    //   <Collapse in = {checked} {... (checked ? {timeout : 1000} : {})} >
        <Card className={classes.root}>
        {/* <CardMedia
            className = {classes.media}
            image= {feature.imageUrl}
            title="Portfolio"
        /> */}
        <CardContent>
            <div margin = "auto" align = 'center'>
                <img src = {feature.src} width = '100%' height = '100%' margin = 'auto'/>
            </div>
            <div className = {classes.setter}>
                <Typography gutterBottom variant="h5" component="div" className ={classes.title}>
                {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className ={classes.description}>
                {feature.description}
                </Typography>
            </div>
        </CardContent>
        </Card>

  );
}