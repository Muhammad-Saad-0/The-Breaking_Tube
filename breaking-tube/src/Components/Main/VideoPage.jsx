import React from "react";
import "../../styles/Video.css";

import { Route, Routes } from "react-router";
import Video from "./Video";
import MainData from "../../Data/MainData";
import Avatar from "../../assets/Icons/Profile/Avatar.jpg";
import { useVideoId } from "../../context/videoIdContext";
import { useVideoTitle } from "../../context/videoTitleContext";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
const VideoPage = ({title}) => {
  const videoId = useVideoId();
  const{ videoID} = useParams()
  const videoTitle = useVideoTitle();
  console.log(videoId, videoTitle);
  return (
    <>
      {MainData.map(({ Avatar, Name }) => {
        return (
          // <React.Fragment key={uuidv4()}>
          //   <iframe
          //     width="560"
          //     height="315"
          //     // src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
          //     src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          //     //  src='https://www.youtube.com/embed/bIcbKGilhME'
          //     title="YouTube video player"
          //     frameBorder="0"
          //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
          <React.Fragment key={uuidv4()}>
            <iframe
              width="560"
              height="315"
              itemType="http://schema.org/VideoObject"
              // src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
              src={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1`}
              //  src='https://www.youtube.com/embed/bIcbKGilhME'
              title="YouTube video player"
              frameBorder="0"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              
              key={uuidv4()}
            ></iframe>
            <p className="video-page-name" key={uuidv4()}>
              {videoTitle}
            </p>
            <div className="video-page-info">
              <img src={Avatar} alt="logo" />
              <p>{Name}</p>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default VideoPage;
