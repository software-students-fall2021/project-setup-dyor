import './App.css';
import NewsTile from './components/NewsTile/newsTile';
import TopBar from './components/TopBar/topBar';

function App() {
  return (
    <div className="App">
      <div>
        <TopBar />
      </div>
      <div>
        <NewsTile />
        <NewsTile />
      </div> 
    </div>
  );
}

export default App;
