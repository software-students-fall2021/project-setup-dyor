import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { Container } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
// import { Collapse } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    background: "rgba(0,0,0,0.7)",
    // background1: 'rgba(82,152,193,0.5)',
    // background2: 'rgba(0,0,100,0.5)',
    //background: 'rgba(0,0,0,0.7)',

    margin: "5px",
    borderRadius: "15px",
  },
  media: {
    height: 440,
  },
  title: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
  },
  description: {
    fontSize: "1rem",
    color: "#ddd",
  },
  setter: {
    margin: "25px",
  },
  imagefix: {
    align: "center",
    paddingBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "20px",
  },
});

export default function ImageCard({ feature, checked }) {
  const classes = useStyles();
  return (
    //   <Collapse in = {checked} {... (checked ? {timeout : 1000} : {})} >
    <div>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.imagefix}>
            <img
              src={feature.src}
              width="100%"
              height="100%"
              margin="auto"
              alt="feature"
            />
          </div>
          <div className={classes.setter}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={classes.title}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.description}
            >
              {feature.description}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
