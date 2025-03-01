import { useEffect, useState } from "react";
import images from "../utils/images"
import LoadingBar from "../components/loadingBar";
import { replace, useNavigate } from "react-router-dom";
import '../css/session.css';
import { auth, provider, db, signOut } from "../utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({email: '', password: ''});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fieldsFilled = Object.values(userData).every(value => value.trim() !== '');
    setSubmitDisabled(!fieldsFilled);
  }, [userData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      let user = userCredential.user;

      await user.reload();
      user = auth.currentUser;

      if (!user.emailVerified) {
        console.log("not Verified");
        setError("Please verify your email before logging in.");
        await signOut(auth);
        return;
      }

    } catch (err) {
      setError(err.message.split("/")[1].split(")")[0]);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <main className="main">
      <div className="form-container">
      <div className={loading ? 'loading' : 'no-loading'}><LoadingBar /></div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="header">
          <div className="signup-container">
            <p>Don't have an account yet?</p>
            <div onClick={()=> navigate('/signup')} className="signup-btn">Sign Up</div>
          </div>
        </div>
        <p className="welcome-txt">Welcome Back 👋</p>
        <p className="signin-txt">Sign in to learn</p>
        <div className="input-container">
          <input placeholder="Email address" value={userData.email} onChange={handleOnChange} name="email" id="email" required className="input-field" />
          <label htmlFor="email" className="input-label">Email address</label>
        </div>
        <div className="input-container">
          <input placeholder="password" value={userData.password} onChange={handleOnChange} required name="password" type={showPassword ? "text" : "password"} id="password" className="input-field"/>
          <label htmlFor="password" className="input-label">Password</label>
          <img className="show-password" src={ showPassword ? images.view : images.noView } alt='show-password' onClick={togglePasswordVisibility}/>
        </div>
        <input type="submit" disabled={submitDisabled} className="submit" value="Login" />
        <p onClick={() => navigate("/forgot-password")} className="forgot-password">Forgot Password?</p>
        
        {error && <p className="session-error">{error}</p>}
      </form>
      </div>
      </main>
    </>
  );
}
