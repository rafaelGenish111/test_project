import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router basename="basename">
      <Routes>
        <Route path='/register' exect element={<Register />} />
        <Route path='/login' exect element={<Login />} />
        <Route path='/home' exect element={<Home />} />
      </Routes>
   </Router>
  );
}

export default App;
