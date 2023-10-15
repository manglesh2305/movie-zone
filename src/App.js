import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favuorites';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={[<Banner/>,<Movies/>]}/>
        <Route path='/favourites' Component={Favourites} />
      </Routes>
    </Router>
  );
}

export default App;
