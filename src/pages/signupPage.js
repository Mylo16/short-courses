import { useEffect, useState } from "react";
import images from "../utils/images";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../components/loadingBar";
import '../css/session.css';
import { auth, db } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({email: '', password: '', confirm: '', firstName: '', lastName: '', phone: ''});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  
  useEffect(() => {
    validatePassword(userData.password);
  }, [userData.password, hasUpperCase, hasLowerCase, hasDigit, hasSpecialChar, isLengthValid]);

  useEffect(() => {
    const fieldsFilled = Object.values(userData).every(value => value.trim() !== '');
    setSubmitDisabled(!fieldsFilled);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const reg = /^([a-z0-9_]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if (!reg.test(userData.email)) {
      setError("Invalid Email");
      setLoading(false);
      return;
    }
  
    if (userData.password !== userData.confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    } 
  
    if (!isPasswordValid) {
      setError("Invalid password input; all requirements must pass");
      setLoading(false);
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      await signOut(auth);

      await setDoc(doc(db, "tempUsers", user.uid), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: user.email,
        role: "student",
        emailVerified: false,
        phone: userData.phone,
      });

      alert("Verification email sent! Please check your inbox.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (value) => {
    setHasUpperCase(/[A-Z]/.test(value));
    setHasLowerCase(/[a-z]/.test(value));
    setHasDigit(/\d/.test(value));
    setHasSpecialChar(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value));
    setIsLengthValid(value.length >= 8);
  
    const isValid =
    hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isLengthValid;
  
    setIsPasswordValid(isValid);
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <main className="main">
      <div className="form-container">
      <div className={loading ? 'loading' : 'no-loading'}><LoadingBar /></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="header">
          <div className="signup-container">
            <p>Already have an account?</p>
            <div onClick={() => navigate('/login')} className="signup-btn">Login</div>
          </div>
        </div>
        <p className="welcome-txt">Hello, Welcome</p>
        <p className="signin-txt">Sign up for better experience</p>
        <div className="input-container">
          <input placeholder="First Name" value={userData.firstName} onChange={handleOnChange} required name="firstName" id="firstName" className="input-field"/>
          <label htmlFor="firstName" className="input-label">First Name</label>
        </div>
        <div className="input-container">
          <input placeholder="Last Name" value={userData.lastName} onChange={handleOnChange} required name="lastName" id="lastName" className="input-field"/>
          <label htmlFor="lastName" className="input-label">Last Name</label>
        </div>
        <div className="input-container">
          <input placeholder="Email address" value={userData.email} onChange={handleOnChange} name="email" id="email" required className="input-field" />
          <label htmlFor="email" className="input-label">Email address</label>
        </div>
        <div className="input-container">
          <input placeholder="phone number" value={userData.phone} onChange={handleOnChange} required type="number" name="phone" id="phone" className="input-field"/>
          <label htmlFor="phone number" className="input-label">Phone number</label>
        </div>
        <div className="input-container">
          <input placeholder="password" value={userData.password} onChange={handleOnChange} required name="password" type={showPassword ? "text" : "password"} id="password" className="input-field"/>
          <label htmlFor="password" className="input-label">Password</label>
          <img className="show-password" src={ showPassword ? images.view : images.noView } alt='show-password' onClick={togglePasswordVisibility}/>
        </div>
        <div className="input-container">
          <input placeholder="Confirm password" value={userData.confirm} onChange={handleOnChange} required name="confirm" type={showPassword ? "text" : "password"} id="confirm" className="input-field"/>
          <label htmlFor="confirm" className="input-label">Confirm Password</label>
          <img className="show-password" src={ showPassword ? images.view : images.noView } alt='show-password' onClick={togglePasswordVisibility}/>
        </div>
        <ul>
          <li className='password-check'>
            <div>Password must include an upper case</div>
            <img src={hasUpperCase ? images.correct : images.wrong} alt="password-check"/>
          </li>
          <li className='password-check'>
            <div>Password must include a lower case</div>
            <img src={hasLowerCase ? images.correct : images.wrong} alt="password-check"/>
          </li>
          <li className='password-check'>
            <div>Password must include a digit</div>
            <img src={hasDigit ? images.correct : images.wrong} alt="password-check"/>
          </li>
          <li className='password-check'>
            <div>Password must include a special character</div>
            <img src={hasSpecialChar ? images.correct : images.wrong} alt="password-check"/>
          </li>
          <li className='password-check'>
            <div>Password must be at least 8 characters long</div>
            <img src={isLengthValid ? images.correct : images.wrong} alt="password-check"/>
          </li>
        </ul>
        <input type="submit" disabled={submitDisabled} className="submit" value="Sign Up" />
        
        {error && <p className="session-error">{error}</p>}
      </form>
      </div>
      </main>
    </>
  );
}
