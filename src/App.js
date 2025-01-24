import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/NavBar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />} >
        <Route index element={<LandingPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
