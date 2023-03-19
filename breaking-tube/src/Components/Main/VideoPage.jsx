import React from "react";
import "../../styles/Video.css";
import MainData from "../../Data/MainData";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player/youtube'
import SideBar from "../SideBar/SideBar";
const VideoPage = () => {
  const{ videoID} = useParams()

  return (
    <>
    {/* <SideBar /> */}
      {MainData.filter((a)=>a.embedId === videoID).map(({ Avatar, Name ,text}) => {
        return (
          <React.Fragment key={uuidv4()}>
            <ReactPlayer
             width='100%'
             height='100%'
              // itemType="http://schema.org/VideoObject"
              // src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
              url={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1`}
              //  src='https://www.youtube.com/embed/bIcbKGilhME'
              // title="YouTube video player"
              // frameBorder="0"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // allowFullScreen
              controls
              // playing
              key={uuidv4()}
            />
            <p className="video-page-name" key={uuidv4()}>
              {text}
            </p>
            <div className="video-page-info">
              <img src={Avatar} alt="logo" />
              <p>{Name}</p>
            </div>
          </React.Fragment>
          // <React.Fragment key={uuidv4()}>
          //   <iframe
          //     width="560"
          //     height="315"
          //     itemType="http://schema.org/VideoObject"
          //     // src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
          //     src={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1`}
          //     //  src='https://www.youtube.com/embed/bIcbKGilhME'
          //     title="YouTube video player"
          //     frameBorder="0"
          //     // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          //     allowFullScreen
              
          //     key={uuidv4()}
          //   ></iframe>
          //   <p className="video-page-name" key={uuidv4()}>
          //     {videoTitle}
          //   </p>
          //   <div className="video-page-info">
          //     <img src={Avatar} alt="logo" />
          //     <p>{Name}</p>
          //   </div>
          // </React.Fragment>
        );
      })}
    </>
  );
};

export default VideoPage;
