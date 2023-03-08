import React,{useState,useEffect} from "react";
import HomeFilter from "../HomeFilter";
import VideosGrid from "../VideosGrid";
import MainData from "../../../Data/MainData";
import { Link } from "react-router-dom";
import "../../../styles/Home.css";
import { useVideoIdUpdate } from "../../../context/videoIdContext";
import { useVideoTitleUpdate } from "../../../context/videoTitleContext";
import { v4 as uuidv4 } from "uuid";
import { useFilterId } from "../../../context/FilterContext";
const FilterRoute = () => {
  const getId = useVideoIdUpdate();
  const getTitle = useVideoTitleUpdate();
  // const FilterId = useFilterId();


  // const [prevId, setPrevId] = useState(JSON.parse(localStorage.getItem('prevId')));

  // useEffect(()=>{
  //   setPrevId(FilterId)
  //     localStorage.setItem('prevId', JSON.stringify(prevId))
  // },[FilterId]);

  // console.log(prevId);

  return (
    
    <>
      {/* <HomeFilter /> */}

      <section className="grid-section">
        {MainData.filter(a => a.Category ===FilterId).map(
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

export default FilterRoute