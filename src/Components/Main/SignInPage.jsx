import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Data/base";
import "../../styles/SignIn.css";
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";
const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorReq, setErrorReq] = useState(false);
  const [errorReq2, setErrorReq2] = useState(false);
  const [errorReq3, setErrorReq3] = useState(false);
  const[errorNotfound , setErrorNotFound] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setErrorReq3(false);
    }, 2000);
  }, [errorReq3]);
  useEffect(() => {
    setTimeout(() => {
      setErrorNotFound(false);
    }, 2000);
  }, [errorNotfound]);
  const signIn = (e) => {
    e.preventDefault();
    if (email === "") {
      console.log("required");
      setErrorReq(true);
    }
    if (password === "") {
      console.log("required");
      setErrorReq2(true);
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      // console.log("invalid");
      setErrorReq3(true);
    }
    if (
      email !== "" &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMsg(error.message);
          if ("Firebase: Error (auth/user-not-found).") {
            // alert("user not found");
            setErrorNotFound(true)
          }
        });
      if (errorMsg !== "" || !errorMsg) {
        navigate('/profile');
      }
    }
  };

  return (
    <>
      <section className="sign-in-section">
        <h4>Log Into Your Account</h4>
        <form className="sign-in-form" onSubmit={signIn}>
          <label htmlFor="email">
            <b>Your Email</b>
            {errorReq && (
              <i style={{ display: "block", color: "		rgb(255, 51, 51)" }}>
                Required*
              </i>
            )}
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-signin-input"
          />
          {errorReq3 && (
            <i style={{ display: "block", color: "		rgb(255, 51, 51)" }}>
              Invalid Email*
            </i>
          )}
           {errorNotfound && (
              <i style={{ display: "block", color: "		rgb(255, 51, 51)" }}>
                Not Found*
              </i>
            )}
          <label htmlFor="password">
            <b>Your Password</b>{" "}
            {errorReq2 && (
              <i style={{ display: "block", color: "		rgb(255, 51, 51)" }}>
                Required*
              </i>
            )}
          </label>
          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordShown ? "text" : "password"}
            id="password"
          />
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
