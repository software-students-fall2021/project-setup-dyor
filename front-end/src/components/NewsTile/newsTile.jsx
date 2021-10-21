import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography';
// import Button from '@material-ui/core/Button'
import DropDownMenu from '../DropDownMenu/drop_down_menu';
import './newsTile.css'
  
export default function NewsTile() {
return (
    <Card sx={{ minWidth: 275 }} className="news">
    <CardContent className="news_content">
        <div className="news_type">
            <span className="news_title">
                MacroEconomic News
            </span>
            <span id="news_dropdown">
                <DropDownMenu className="dropdown_menu"/>
            </span> 
        </div> 
    </CardContent>
    </Card>
);
}