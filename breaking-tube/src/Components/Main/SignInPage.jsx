import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Data/base";
import "../../styles/SignIn.css";
import { useNavigate } from "react-router";
 
  import { Link } from "react-router-dom";
const LoginPage = () => {

   
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')
const navigate = useNavigate()
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMsg(error.message)
        if("Firebase: Error (auth/user-not-found)."){
          alert('user not found')
        }
      });
      if(errorMsg !== ''){
        navigate(-1)
      }
  };
  
  return (
    <>
      <section className="sign-in-section">
        <h4>Log Into Your Account</h4>
        <form className="sign-in-form" onSubmit={signIn}>
          <label htmlFor="email">
            <b>Your Email</b>
          </label>
          <input type="email" id="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-signin-input" />

          <label htmlFor="password">
            <b>Your Password</b>{" "}
          </label>
          <input
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={passwordShown ? "text" : "password"} id="password" />
          <div>
            <input
              type="checkbox"
              id="show-password"
              onClick={togglePassword}
            />
            <label htmlFor="show-password">
              {/* {passwordShown ? "Hide Password" : "Show Password"
            } */}
              Show Password
            </label>
          </div>

          <button type="submit">Log In</button>
        </form>
        {/* <p className="signup-redirect">Dont have an Account?
          <Link to='/signUp'>Sign Up</Link>
        </p> */}
      </section>
    </>
  );
};

export default LoginPage;
