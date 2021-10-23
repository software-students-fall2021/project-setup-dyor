import * as React from 'react'
import TopBar from '../TopBar'
import NewsTile from '../../components/NewsTile'
import './newsPage.css'

export default function NewsPage() {
    return (
        <div className="newspage">
            <TopBar className="header"></TopBar>
            <NewsTile className="newstile"></NewsTile>
            <NewsTile className="newstile"></NewsTile>
            <NewsTile className="newstile"></NewsTile>
            <NewsTile className="newstile"></NewsTile>
            <NewsTile className="newstile"></NewsTile>
            <Footer className="footer" />
        </div>
    );
}