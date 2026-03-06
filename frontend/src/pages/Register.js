// Register Page - Refactored for OTP Flow
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useApp } from '../context/AppContext';
import '../styles/pages/Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = Request OTP, 2 = Verify OTP
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [devOtp, setDevOtp] = useState(''); // Shared for testing in dev mode

  const navigate = useNavigate();
  const { login } = useApp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.requestOtp(formData.phone, formData.name, formData.email);
      // If in development mode, the backend might return the OTP for ease of use
      if (response.data.devOtp) {
        setDevOtp(response.data.devOtp);
      }
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please check your phone number.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.verifyOtp(formData.phone, otp);
      const { token, user } = response.data;

      login(user, token);
      navigate('/menu');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>{step === 1 ? 'Join the Tino and Friends family' : 'We sent a code to your phone'}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          {devOtp && step === 2 && (
            <div className="dev-otp-alert" style={{ background: '#EFE7D5', padding: '10px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #DBC79E', color: '#071C2C', fontSize: '0.9rem' }}>
              <strong>[Dev Mode]</strong> Your OTP is: <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{devOtp}</span>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestOtp}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+20 123 456 7890"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Verification Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label htmlFor="otp">Enter 6-Digit Code</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength="6"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <button
                type="button"
                className="resend-btn"
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: '#071C2C', textDecoration: 'underline', marginTop: '15px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Change Phone Number
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
