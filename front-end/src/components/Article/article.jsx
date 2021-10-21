import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import './article.css'

export default function Article(){
    return (
        <Paper variant="outlined" className="article_paper" elevation={3}>
            <article className="article">
                <h4 className="article_title">Article Heading</h4>
                <h5 className="extract_title">Article Extract</h5>
                <Typography className="article_content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra 
                    convallis posuere morbi. A cras semper auctor neque. Faucibus a pellentesque sit 
                    amet porttitor eget. Suspendisse sed nisi lacus sed viverra. In arcu cursus euismod 
                    quis viverra nibh. Consectetur libero id faucibus nisl. Sed euismod nisi porta lorem. 
                    Pellentesque habitant morbi tristique senectus et. Mattis enim ut tellus elementum 
                    sagittis vitae et. Euismod elementum nisi quis eleifend quam adipiscing vitae proin 
                    sagittis. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Metus aliquam 
                    eleifend mi in nulla posuere sollicitudin.
                </Typography>
            </article>
        </Paper>
    );
}