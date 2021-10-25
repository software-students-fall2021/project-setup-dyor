import * as React from 'react'
import TopBar from '../../components/TopBar/TopBar'
import Footer from '../../components/Footer/footer'
import './newsPage.css'
import NewsTile from '../../components/NewsTile/newsTile';

const coins = ["bitcoin", "ethereum", "polkadot"]
export default function NewsPage() {
    return (
        <div className="newspage">
            <TopBar className="header"></TopBar>
            <NewsTile news_type="cryptocurrency" sortBy="publishedAt"/>
            {coins.map((coin, index) => (
                    <NewsTile key={index} news_type={coin} sortBy="relevancy" />
            ))}
            <Footer className="footer" />
        </div>
    );
}