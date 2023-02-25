import React from "react";
import HomeFilter from "./HomeFilter";
import MainData from "../../Data/MainData";
import "../../styles/Home.css";
import NavBar from "../NavigationBar/NavBar";
import SideBar from "../SideBar/SideBar";
import VideosGrid from "./VideosGrid";
import { Route, Routes } from "react-router";
import Playlist from "../Playlist";
import VideoPage from "./VideoPage";
const Main = () => {
  return (
    <>
    
  
  
    
      <section className="main-section">
 <Routes >
 <Route path="/playlist" element={<Playlist />} />

 <Route path="/" element={ <VideosGrid />} />
 <Route path="/video" element={ <VideoPage />} />


 </Routes>
      
      </section>
    </>
  );
};

export default Main;
