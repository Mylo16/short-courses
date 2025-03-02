import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleResetPassword} className="login-form">
        <h2>Reset Password</h2>
        <p>Enter your email to reset your password</p>
        
        <div className="input-container">
          <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" required className="input-field" />
          <label htmlFor="email" className="input-label">Enter your email address</label>
        </div>
        <button className="fp-btn" type="submit" disabled={loading}>Send Reset Email</button>
        {error && <p className="session-error">{error}</p>}
        {message && <p className="session-success">{message}</p>}
        <p onClick={() => navigate("/login")} className="link">
          <span>&larr;</span>
          Back to Login
        </p>
      </form>
    </div>
  );
}
