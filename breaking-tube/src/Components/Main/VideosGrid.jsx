import React from "react";
import { Link } from "react-router-dom";
import MainData from "../../Data/MainData";
import "../../styles/Home.css";
import HomeFilter from "./HomeFilter";
import { useVideoIdUpdate } from "../../context/videoIdContext";
import { useVideoTitleUpdate } from "../../context/videoTitleContext";
import { v4 as uuidv4 } from "uuid";
import { useFilterId } from "../../context/FilterContext";
const VideosGrid = () => {
  const getId = useVideoIdUpdate();
  const getTitle = useVideoTitleUpdate();
  const FilterId = useFilterId()
  return (
    <>
      <HomeFilter />
      <section className="grid-section">
        {MainData.map(
          ({ Thumbnail, text, Avatar, views, time, Name, embedId ,Category}) => {
            return (
            <Link
                  to={`/video/${embedId}`}
                 
                  className="video"
                  key={uuidv4()}

                  onClick={() => {
                    getId(embedId);
                    getTitle(text);
                  }}
                >
                  <div className="video-top">
                    <div className="thumbnail-section">
                      <img src={Thumbnail} alt={text} />
                    </div>
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/40tX4s5Ecwc?rel=0&modestbranding=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                  </div>
                  <div className="video-bottom">
                    <div className="video-bottom-top">
                      <img src={Avatar} alt="Avatar" />
                    </div>
                    <div className="video-info-section">
                      <p> {text}</p>
                      <p>{Name}</p>
                      <div className="video-info">
                        <p> {views}</p>
                        <p className="time"> {time}</p>
                      </div>
                    </div>{" "}
                  </div>
                </Link>
          
         
                
           
            );
          }
        )}
      </section>
    </>
  );
};

export default VideosGrid;