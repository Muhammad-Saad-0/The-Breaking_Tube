import React from "react";
import { Route, Routes } from "react-router";
import VideoData from "../../Data/Video";

const VIdeo = ({embedId}) => {
    return(
     
<>
    <section>
      {VideoData.map(({ Name,  Category, channelName, Avatar }) => {
        return (
       <article>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <p className="video-page-name">{Name}</p>
            <div className="video-page-info">
              <img src={Avatar} alt="logo" />
              <p>{channelName}</p>
            </div>
          </article>
        );
      })}
    </section>
    </>

    )
  
};

export default VIdeo;
