import React from "react";
import "../../styles/Video.css";
import VideoData from "../../Data/Video";
import { Route, Routes } from "react-router";
import VIdeo from "./VIdeo";

const VideoPage = () => {


  return (
    <>

    {/* <section> */}
{VideoData.map(({embedId})=>{
    return( 
        <Routes>
   <Route path={`/video/${embedId}`} element={<VIdeo embedId={embedId} />} />
   </Routes>
   ) 
 })} 
    {/* </section> */}
  
</>
  );
};

export default VideoPage;
