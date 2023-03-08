import React, { useEffect, useState } from "react";
import HomeFilter from "./HomeFilter";
import MainData from "../../Data/MainData";
import "../../styles/Home.css";
import NavBar from "../NavigationBar/NavBar";
import SideBar from "../SideBar/SideBar";
import VideosGrid from "./VideosGrid";
import { Route, Routes } from "react-router";
import Playlist from "../Playlist";
import VideoPage from "./VideoPage";
import { useVideoId } from "../../context/videoIdContext";

import FilterRoute from "./filterRoutes/filterRoute";
import { useFilterId } from "../../context/FilterContext";


const Main = () => {
  const FilterId = useFilterId();

  


  const videoId = useVideoId()

  return (
    <>
    
  
  

      <section className="main-section">
 <Routes >
 <Route path="/playlist" element={<Playlist />} />

 <Route exact path="/" element={ <VideosGrid />} />
 <Route path={`/video/${videoId}`} element={ <VideoPage />} />

  <Route path={`/${FilterId}`} element={ <FilterRoute />  } />


 </Routes>
      
      </section>
    </>
  );
};

export default Main;
