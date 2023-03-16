import React, { useEffect, useState } from "react";
import HomeFilter from "./HomeFilter";
import MainData from "../../Data/MainData";
import "../../styles/Home.css";
import NavBar from "../NavigationBar/NavBar";
import SideBar from "../SideBar/SideBar";
import VideosGrid from "./VideosGrid";
import { Route, Routes } from "react-router";
import Playlist from "./Playlist";
import VideoPage from "./VideoPage";
import { useVideoId } from "../../context/videoIdContext";
import { useFilterId } from "../../context/FilterContext";
import { useSidebar } from "../../context/SideBarContext";
import SignInPage from "./SignInPage";
import Profile from "./Profile";
import SignUp from "./SignUp";
import SignIn from "./SignInPage";
import { useAuth } from "../../context/AuthContext";
import WatchLater from "./WatchLaterPage";
import { useVideoTitle } from "../../context/videoTitleContext";

const Main = () => {
  const sideBarOpen = useSidebar();
  const FilterId = useFilterId();
  const videoId = useVideoId();
  const authUser = useAuth();
   const title = useVideoTitle()
  return (
    <>
      <section
        className="main-section"
        style={
          sideBarOpen
            ? { backgroundColor: "#1e1d1d" }
            : { backgroundColor: "#303030" }
        }
      >
        <Routes>
          {/* <Route exact path="/profile" element={<Profile />} /> */}

          <Route exact path="/" element={<VideosGrid />} />
          {/* {MainData.map(({embedId})=>{
            <Route exact path={`/video/${embedId}`} element={<VideoPage />} />
          })} */}
          {/* <Route exact path={`/video/${videoId}`} element={<VideoPage />} /> */}
          <Route exact path='/video/:videoID' element={<VideoPage title={title} />} />
          {/* <Route exact path="/signUp" element={ <SignUp />} /> */}
          <Route exact path="/signIn" element={<SignIn />} />
          <Route
            exact
            path={"/playlist"}
            element={authUser ? <Playlist /> : <SignUp />}
          />
          <Route
            exact
            path={"/profile"}
            element={authUser ? <Profile /> : <SignUp />}
          />
          <Route
            exact
            path={"/watchlater"}
            element={authUser ? <WatchLater /> : <SignUp />}
          />
        </Routes>
      </section>
    </>
  );
};

export default Main;
