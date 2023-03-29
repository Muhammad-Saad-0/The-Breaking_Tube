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
import History from "./History";
import SinglePlaylist from "./SinglePlaylist";
import Liked from "./Liked";
import { useTheme } from "../../context/ThemeContext";
const Main = () => {
  const sideBarOpen = useSidebar();
  const FilterId = useFilterId();
  const videoId = useVideoId();
  const authUser = useAuth();
  const title = useVideoTitle();
  const theme = useTheme();

  const [width, setWidth] = useState(window.innerWidth);
  const [bg, setBg] = useState('');

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    function getBg() {
      if (sideBarOpen && !theme && window.innerWidth >= 620) {
        // return "#1e1d1d";
        setBg('#1e1d1d')
      }
      if (sideBarOpen && !theme && window.innerWidth <= 620) {
        setBg('#303030')
        // return "#303030";
      }
      if(!sideBarOpen && !theme){
        setBg('#303030')

      }
      if (sideBarOpen && theme && window.innerWidth >= 620) {
        // return '#B0B0B0';
        setBg('#B0B0B0')
      }
      if (sideBarOpen && theme && window.innerWidth <= 620) {
        // return '#B0B0B0';
        setBg('#ffffff')
      }
      if(!sideBarOpen && theme){
      //  return "#ffffff"
      setBg('#ffffff')
      }
      // return '#ffffff'
    }
    getBg()
  },[width , theme , sideBarOpen]);
  
  // function getBg() {
  //   if (sideBarOpen && !theme && window.innerWidth > 620) {
  //     return "#1e1d1d";
  //   }
  //   if (sideBarOpen && !theme && window.innerWidth < 620) {
  //     return "#303030";
  //   }
  //   if(!sideBarOpen && !theme){
  //     return "#303030"
  //   }
  //   if (sideBarOpen && theme) {
  //     return '#B0B0B0';
  //   }
  //   if(!sideBarOpen && theme){
  //    return "#ffffff"
  //   }
  //   // return '#ffffff'
  // }
  return (
    <>
      <section
        className="main-section"
        style={
          {backgroundColor: 
            // `${getBg()}`
            bg
            ,
            transition: 'none'

      }
  }
  // id={theme?'light':'dark'}
      >
        <Routes>
          <Route exact path="/" element={<VideosGrid />} />
          <Route
            exact
            path="/video/:videoID"
            element={<VideoPage title={title} />}
          />
          <Route
            exact
            path="/playlist/:playlistID"
            element={<SinglePlaylist />}
          />

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
          <Route
            exact
            path={"/history"}
            element={authUser ? <History /> : <SignUp />}
          />
          <Route
            exact
            path={"/liked"}
            element={authUser ? <Liked /> : <SignUp />}
          />
        </Routes>
      </section>
    </>
  );
};

export default Main;
