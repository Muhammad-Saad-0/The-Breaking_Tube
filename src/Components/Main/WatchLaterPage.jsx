import React, { useEffect, useState } from "react";
import "../../styles/watchLater.css";
import { db, colRef, auth } from "../../Data/base";
import {
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useWatchLaterId } from "../../context/WatchLaterId";
import { v4 as uuidv4 } from "uuid";
import more from "../../assets/Icons/Misc/More.svg";
import RemoveWatchLater from "./RemoveWatchLater";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/Home.css";
import NoVideos from "./NoVideos";
const WatchLater = () => {
  const [moreModal, setMoreModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [empty,setEmpty] = useState(false)
  const handleClick = (embedId) => {
    setSelectedId(embedId);
  };
const theme = useTheme()
  let user = auth.currentUser;
  const q = query(
    collection(db, "Watch Later"),
    where("Author", "==", user.uid)
  );

  const [ro, setRo] = useState([]);
  useEffect(() => {
    const getVids = async () => {
      const Vids = await getDocs(q);
      Vids.forEach((Vid) => {
        if (Vids.docs.length != ro.length) {
          setRo((r) => [
            ...r,
            {
              Id: Vid.data().Id,
              Name: Vid.data().Name,
              Thumbnail: Vid.data().Thumbnail,
              text: Vid.data().text,
              time: Vid.data().time,
              views: Vid.data().views,
              Avatar: Vid.data().Avatar,
            },
          ]);
        }
      });
      if(Vids.docs.length === 0){
        setEmpty(true)
      }
    };

    getVids();
  }, []);

  return (
    <>
      <h3 style={theme?{color:'#303030'}:{color:'#ffffff'}}>Watch Later</h3>
    {empty?<NoVideos />:   <section
       
        className="grid-section"
        id={theme ? "light" : "dark"}
      >
        
        {ro.map((r) => {
          return (
            <div key={uuidv4()}>
              <Link to={`/video/${r.Id}`} className="video">
                <div className="video-top">
                  <div className="thumbnail-section">
                    <img src={r.Thumbnail} alt={r.text} />
                  </div>
                </div>

                <div className="video-bottom">
                  <div className="video-bottom-top">
                    <img src={r.Avatar} alt="Avatar" />
                  </div>
                  <div className="video-info-section">
                    <div className="title-button-section">
                      {" "}
                      <p> {r.text}</p>
                      <button
                        className="more-button"
                        onClick={(e) => {
                          handleClick(r.Id);
                          e.preventDefault();
                          e.stopPropagation();
                          setMoreModal(!moreModal);
                        }}
                      >
                        <img src={more} alt="more" />
                      </button>
                      {moreModal && r.Id === selectedId ? (
                        <RemoveWatchLater
                          Id={selectedId}
                          Thumbnail={r.Thumbnail}
                          text={r.text}
                          Avatar={r.Avatar}
                          views={r.views}
                          time={r.time}
                          Name={r.Name}
                        />
                      ) : (
                        false
                      )}
                    </div>

                    <p>{r.Name}</p>

                    <div className="video-info">
                      <p> {r.views}</p>
                      <p className="time"> {r.time}</p>
                    </div>
                  </div>{" "}
                </div>
              </Link>
            </div>
          );
        })}
      </section>}
    </>
  );
};

export default WatchLater;
