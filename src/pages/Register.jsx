import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Register = () => {
  const navigate = useNavigate();
  // Get user and register function
  const { user, register } = useAuth();
  // State for holding data
  const [data, setData] = useState({
    email: '',
    remail: '',
    password: '',
    rpassword: '',
    displayName: '',
  });

  // Handle register on submit
  const handleRegister = async (e) => {
    e.preventDefault();

    // Try register with email and password
    // Else error
    try {
      if (data.email === data.remail) {
        if (data.password === data.rpassword) {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          await setDoc(doc(db, 'Users', data.email), {
            userName: data.displayName,
            email: data.email,
            createdAt: (today = mm + '/' + dd + '/' + yyyy),
          });

          await register(data.email, data.password);

          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: data.displayName,
            // photoURL: 'https://example.com/jane-q-user/profile.jpg',
          })
            .then(() => {
              navigate('/');
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert('Passwords do not match');
        }
      } else {
        alert('Emails do not match');
      }
    } catch (err) {
      // TODO: handle register failure
      console.log(err);
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
        <h2>Sign Up</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>

        {/* Login Form */}
        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="form-div">
            <label>Username</label>
            <input
              id="username"
              type="text"
              label="Username"
              onChange={(e) => {
                setData({
                  ...data,
                  displayName: e.target.value,
                });
              }}
              required
              placeholder="Username"
            />
          </div>
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
          {/* Email */}
          <div className="form-div">
            <label>Repeat Email</label>
            <input
              id="remail"
              type="email"
              label="REmail"
              onChange={(e) => {
                setData({
                  ...data,
                  remail: e.target.value,
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
              placeholder="Password"
              required
            />
          </div>
          {/* Repeat Password */}
          <div className="form-div">
            <label>Repeat Password</label>
            <input
              id="rpassword"
              type="password"
              label="RPassword"
              onChange={(e) => {
                setData({
                  ...data,
                  rpassword: e.target.value,
                });
              }}
              placeholder="Repeat Password"
              required
            />
          </div>
          <button>Sign in</button>
        </form>

        {/* Link to register */}
        <p className="new-client">
          Already part of Revio? <Link to="/login">Sign in</Link>
        </p>

        {/* Copyright */}
        <p className="copyright">© 2022. All RIGHT RESERVED.</p>
      </div>
    </main>
  );
};

export default Register;
