import {
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    getAuth,
  } from "firebase/auth";
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import { firebaseApp } from "../services/firebase";
  
  function Signup() {
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
  
    const auth = getAuth(firebaseApp);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError("");
      let email = input.email.toLowerCase().trim();
      let password = input.password;
  
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          console.log(userCredential.user);
          // ...
        })
        .catch((err) => {
          if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
            alert("The password is too weak");
          }
        });
    };
  
    const handleChange = (e) => {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    return (
      <div className="form-body">
        <form autoComplete="off" className="form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <p>Fill the form below to create your account.</p>
          <div className="email-input">
            <input
              name="email"
              type="text"
              onChange={handleChange}
              value={input.email}
              required
              autoComplete="true"
            />
            <label htmlFor="email" className="label-name">
              <span className="content-name">Email</span>
            </label>
          </div>
          <div className="password-input">
            <input
              name="password"
              onChange={handleChange}
              value={input.password}
              type="password"
              required
              autoComplete="true"
            />
            <label htmlFor="password" className="label-name">
              <span className="content-name">Password</span>
            </label>
          </div>
          <div className="btn">
            {error ? <p className="login-error">{error}</p> : null}
            <button title="Sign up" aria-label="Signup" type="submit">
              Create account
            </button>
          </div>
        </form>
        <div className="option">
          <p>
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    );
  }
  export default Signup;