import React from "react";
import { signOut } from "firebase/auth";
import profilepic from "../../assets/Icons/Profile/heisenberg.jpg";
import { useAuth } from "../../context/AuthContext";
import {auth}from '../../Data/base'
import SignUp from "./SignUp";
const Profile = () => {
  const authUser = useAuth();
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
     {authUser? <section>
        <img src={profilepic} alt="profile pic" />
        <p>{authUser?authUser.email:false}</p>
        <button onClick={userSignOut}>Sign Out</button>
      </section>:<SignUp />}
    </>
  );
};

export default Profile;
