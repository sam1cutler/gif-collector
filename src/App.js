import { Route } from 'react-router-dom';
import './App.css';
import TrendingList from './TrendingList';
import GifDetails from './GifDetails';

function App() {

  
  // for "home" page --> 
  //   fetch to "trending" endpoint, display list
  

  // for "individual" page --> 
  //   fetch to "individual gif" endpoint, display more robust info

  function renderContent() {

    return (
      <>
        <Route 
          path='/'
          exact
          component={TrendingList}
        />
        <Route 
          path='/gif/:gifId'
          exact
          component={GifDetails}
        />
      </>

    )

  }


  return (
    <div className="app-container">
      <h1>
        GIFs emporium
      </h1>
      <div className='content-container'>
        <div>
          Sometimes this will be a list of gifs
        </div>
        <div>
          Sometimes this will be more detailed info about a single gif
        </div>
      </div>
    </div>
  );
}

export default App;
