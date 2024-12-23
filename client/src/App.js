import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' exect Component={Register} />
        <Route path='/login' exect Component={Login} />
        <Route path='/home' exect Component={Home} />
      </Routes>
   </Router>
  );
}

export default App;
