import * as React from 'react'
import TopBar from '../../components/TopBar/topBar'
import Footer from '../../components/Footer/footer'
import './newsPage.css'
import NewsTile from '../../components/NewsTile/newsTile';

export default function NewsPage() {
    return (
        <div className="newspage">
            <TopBar className="header"></TopBar>
            <NewsTile />
            <Footer className="footer" />
        </div>
    );
}