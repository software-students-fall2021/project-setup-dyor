import './App.css';
import TopBar from './components/TopBar/topBar';
import NewsTile from './components/NewsTile/newsTile'
import Footer from './components/Footer/footer';

function App() {
  return (
    <div className="App">
      <TopBar />
      <NewsTile />
      <NewsTile />
      <NewsTile />
      <NewsTile />
      <NewsTile />
      <NewsTile />
      <NewsTile />
      <Footer />
    </div>
  );
}

export default App;
