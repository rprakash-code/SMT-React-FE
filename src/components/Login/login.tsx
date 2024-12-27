import React, { useState } from 'react';
import '../../styles/Login/login.scss';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [email, setEmail] = useState(''); // State for email input
    const [error, setError] = useState(''); // State for validation error
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Toggle function for dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Email validation function
    const validateEmail = (inputEmail: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email
        return emailRegex.test(inputEmail);
    };

    // Handle Next Button Click
    const handleNext = () => {
        if (email.trim() === '') {
            setError('Email is required'); // Empty email error
        } else if (!validateEmail(email)) {
            setError('Invalid email format'); // Invalid email error
        } else {
            setError(''); // Clear error
            navigate('/dashboard'); // Redirect to the dashboard page
        }
    };

    return (
        <div className="login-page">
            {/* Left Section */}
            <div className={`login-form ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className="header">
                    <h4 className="logo">SSO Login</h4>

                    {/* Toggle Switch */}
                    <div className="dark-mode-toggle">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="email" className="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value); // Update email state
                                setError(''); // Clear the error when the user starts typing
                            }}
                        />
                        {/* Display error message */}
                        {error && <div className="error-message">{error}</div>}
                    </div>
                    <button type="button" className="btn-next" onClick={handleNext}>
                        Next
                    </button>
                </form>
            </div>

            {/* Right Section */}
            <div className="illustration">
                <h4>Software Management Tool</h4>
            </div>
        </div>
    );
};

export default Login;
