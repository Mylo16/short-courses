import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/CoursesPage';
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/courses' element={<Courses />}/>
      <Route path='/course-details' element={<CourseDetails />}/>
      <Route path='/' element={<Navbar />} >
        <Route index element={<LandingPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
