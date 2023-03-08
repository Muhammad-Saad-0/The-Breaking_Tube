import React from "react";
import { Route, Routes } from "react-router";

import MainData from "../../Data/MainData";

const Video = () => {
  // let vidSrc = `https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`
  return (
    <>
      <section>
        {MainData.map(({ Name, Category, channelName, Avatar, embedId }) => {
          return (
            <div>
              {/* <iframe
              width="560"
              height="315"
              // src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
              src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
              // src='https://www.youtube.com/embed/bIcbKGilhME'
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe> */}
              <p className="video-page-name">{Name}</p>
              <div className="video-page-info">
                <img src={Avatar} alt="logo" />
                <p>{channelName}</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Video;
