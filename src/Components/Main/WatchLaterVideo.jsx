import React,{useState} from "react";
import MainData from "../../Data/MainData";
import { Link } from "react-router-dom";
import more from "../../assets/Icons/Misc/More.svg";
import MoreModal from "./MoreModal";
import { v4 as uuidv4 } from "uuid";
const WatchLaterVideo = ({Id}) => {
    const [moreModal, setMoreModal] = useState(false);
    const [selectedId,setSelectedId] = useState('')
  
   const handleClick =(embedId)=>{
  
    setSelectedId(embedId)
    
   }
    
  return (
    <div  >
      {MainData
      .filter((a) => a.embedId === Id)
      .map(
        ({ Thumbnail, text, Avatar, views, time, Name, embedId, Category }) => {
          return (
            <div  key={uuidv4()}>
              <Link
                to={`/video/${embedId}`}
                className="video"
               
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
                    <div className="title-button-section">
                      {" "}
                      <p> {text}</p>
                      <button
                      name="more"
                        className="more-button"
                        onClick={(e) => {
                          handleClick(embedId);
                          e.preventDefault();
                          e.stopPropagation();
                          setMoreModal(!moreModal);
                        }}
                      >
                        <img src={more} alt="more" />
                      </button>
                      {moreModal && embedId === selectedId ? (
                        <MoreModal
                          Id={embedId}
                          Thumbnail={Thumbnail}
                          text={text}
                          Avatar={Avatar}
                          views={views}
                          time={time}
                          Name={Name}
                        />
                      ) : (
                        false
                      )}
                    </div>

                    <p>{Name}</p>

                    <div className="video-info">
                      <p> {views}</p>
                      <p className="time"> {time}</p>
                    </div>
                  </div>{" "}
                </div>
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
};

export default WatchLaterVideo;
