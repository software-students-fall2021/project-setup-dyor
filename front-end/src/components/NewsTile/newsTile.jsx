import * as React from 'react';
import DropDownMenu from '../DropDownMenu/drop_down_menu';
import Article from '../Article/article'
import './newsTile.css'
  
export default function NewsTile({news_type, heading, extract, contents}) {
return (
    <div className="news">
        <div className="news_content">
            <div className="news_header">
                <div className="news_type">
                    <h3 className="news_title">
                        MacroEconomic News
                    </h3>
                    <span id="news_dropdown">
                        <DropDownMenu className="dropdown_menu"/>
                    </span> 
                </div> 
            </div>

            <Article />
            <Article />

        </div>
    </div>
);
}