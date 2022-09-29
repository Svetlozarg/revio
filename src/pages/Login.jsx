import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // Get user, login function
  const { user, login } = useAuth();
  // State for user data
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  // Handle login on submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Try login with email and password
    // Else error
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      console.log(err);
      // TODO: need to handle login failure
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  return (
    <main className="login-page">
      {/* Left Div */}
      <div className="login-left">
        {/* Logo */}
        <h2>Revio</h2>
        {/* Description */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="login-right">
        <h2>Sign In</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="form-div">
            <label>Email</label>
            <input
              id="email"
              type="email"
              label="Email"
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
              required
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div className="form-div">
            <label>Password</label>
            <input
              id="password"
              type="password"
              label="Password"
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              placeholder="password"
              required
            />
          </div>

          <button>Sign in</button>
        </form>

        {/* Link to register */}
        <p className="new-client">
          New to Revio? <Link to="/register">Sign up</Link>
        </p>

        {/* Copyright */}
        <p className="copyright">© 2022. All RIGHT RESERVED.</p>
      </div>
    </main>
  );
};

export default Login;
