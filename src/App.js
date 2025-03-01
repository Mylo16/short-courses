import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/CoursesPage';
import CourseDetails from './pages/CourseDetails';
import PrivateRoute from './utils/PrivateRoute';
import SignupPage from './pages/signupPage';
import LoginPage from './pages/loginPage';
import { AuthProvider, useAuth } from './utils/authProvider';
import LoadingBar from './components/loadingBar';
import AdminPanel from './pages/AdminPanel';
import Summary from './pages/Summary';
import CourseInfo from './pages/CourseInfo';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return(
  <AuthProvider>
    <AppContent />
  </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <Routes>
      <Route path='/' element={<Navbar />} >
        <Route index element={<LandingPage />}/>
      </Route>
      <Route element={<PrivateRoute userAllowed={!!user} redirectTo="/" />}>
        <Route index path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/course-details/:courseId' element={<CourseDetails />} />
        <Route path='/course-info/:courseId' element={<CourseInfo />} />
        <Route path='/summary' element={<Summary />} />
      </Route>
      <Route element={<PrivateRoute userAllowed={!user} redirectTo="/dashboard" />}>
        <Route path='/' element={<Navbar user={user} />} >
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/courses/:courseId' element={<CourseInfo />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
