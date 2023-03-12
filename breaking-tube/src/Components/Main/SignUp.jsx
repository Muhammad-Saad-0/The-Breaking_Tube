import React, { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../Data/base";
import "../../styles/SignIn.css";
import { useNavigate } from "react-router";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
const nav = useNavigate()
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async  function signUp(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
      try {
        await auth.signIn(email, password);
        userHasAuthenticated(true);
        nav("/");
      } catch (e) {
        console.log(e.message);
        if(e.message ='(intermediate value).signIn is not a function'){
alert('email already in use')
        }
      }
      // nav(-2)
  };
  
  return (
    <>
      <section className="sign-in-section">
        <h4>Create Account</h4>
        <form className="sign-in-form" onSubmit={signUp}>
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

          <button type="submit">Sign Up</button>
        </form>
        <p className="signup-redirect">Already a User?
          <Link to='/signIn'>Sign In</Link>
        </p>
      </section>
    </>
  );
};

export default SignUp;
