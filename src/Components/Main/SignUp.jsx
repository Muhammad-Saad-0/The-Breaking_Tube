import React, { useState ,useEffect} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Data/base";
import "../../styles/SignIn.css";
import { useNavigate } from "react-router";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const nav = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [errorReq,setErrorReq]= useState(false)
const [errorReq2,setErrorReq2]= useState(false)
const [errorReq3,setErrorReq3]= useState(false)

const [errorAlreadyReq,setErrorAlreadyReq]= useState(false)
useEffect(()=>{
  setTimeout(() => {
    setErrorReq3(false)
  }, 2000);
},[errorReq3])

useEffect(()=>{
  setTimeout(() => {
    setErrorAlreadyReq(false)
  }, 2000);
},[errorAlreadyReq])
  async function signUp(e) {
    e.preventDefault();
    if (email === "") {
      console.log("required");
      setErrorReq(true)
    }
    if (password === "") {
      console.log("required");
      setErrorReq2(true)
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      // console.log("invalid");
      setErrorReq3(true)
    
    }
    if (email !== "" && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ) {
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
      } catch (e) {
        console.log(e.message);
        if ((e.message = "(intermediate value).signIn is not a function")) {
          setErrorAlreadyReq(true)
          // alert("email already in use");
        }
      }
      nav(-2);
    }
  }

  return (
    <>
      <section className="sign-in-section">
        <h4>Create Account</h4>
        <form className="sign-in-form" onSubmit={signUp}>
          <label htmlFor="email">
            <b>Your Email</b>
          {errorReq&& <i style={{display:"block",color:"		rgb(255, 51, 51)"}}>Required*</i>}

          </label>
          <input
            // type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-signin-input"
          />
          {errorAlreadyReq && <i style={{display:"block",color:"		rgb(255, 51, 51)"}}>Email Already in use*</i>}
          {errorReq3 && <i style={{display:"block",color:"		rgb(255, 51, 51)"}}>Invalid Email*</i>}
          <label htmlFor="password">
            <b>Your Password</b>{" "}
          {errorReq2&& <i style={{display:"block",color:"		rgb(255, 51, 51)"}}>Required*</i>}

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

          <button type="submit">Sign Up</button>
        </form>
        <p className="signup-redirect">
          Already a User?
          <Link to="/signIn">Sign In</Link>
        </p>
      </section>
    </>
  );
};

export default SignUp;
