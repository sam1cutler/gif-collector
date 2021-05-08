import { Route } from 'react-router-dom';
import './App.css';
import TrendingList from './TrendingList';
import GifDetails from './GifDetails';

function App() {

  
  
  

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
      {renderContent()}
    </div>
  );
}

export default App;
