import React, { useEffect, useState } from "react";
import "../../styles/Video.css";
import MainData from "../../Data/MainData";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import SideBar from "../SideBar/SideBar";
import more from "../../assets/Icons/Misc/More.svg";
import MoreModal from "./MoreModal";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../Data/base";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useCheckLikedUpdate } from "../../context/LikedContext";
import { useCheckLiked } from "../../context/LikedContext";
import { useTheme } from "../../context/ThemeContext";
const VideoPage = () => {
const theme = useTheme()
  const { videoID } = useParams();

  const [moreModal, setMoreModal] = useState(false);
  const [InWatchLater, setInWatchLater] = useState(false);
  // const [videoLiked, setVideoLiked] = useState(false);
  const videoLiked = useCheckLiked()
  const setVideoLiked = useCheckLikedUpdate()

  const style = { transform: "translate(55vw,-5vw)" };



  // const checkLikedExistence = async (embedId) => {
  //   const docRef = doc(db, "Liked", embedId);
  //   const docSnap = await getDoc(docRef);
  //   if (!docSnap.exists()) {
  //     setVideoLiked(true);
  //   } else {
  //     setVideoLiked(true);
  //   }
  // };
// checkLikedExistence()


  const addtoLiked = async (Avatar, Name, text, Thumbnail, time, views, embedId)=>{
    console.log(embedId);
    const docRef = doc(db, "Liked", embedId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
     setDoc(doc(db, "Liked", embedId),
     {
       embedId,
       Thumbnail,
       text,
       Avatar,
       views,
       time,
       Name,
       Author: auth.currentUser.uid,
     },
     { merge: true }
   );
    }else{
      deleteDoc(doc(db,'Liked',embedId))
    }
  }
  const checkExistence = async (embedId)=>{
    const docRef = doc(db, "Watch Later", embedId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      setInWatchLater(false);
    }else{
      setInWatchLater(true);
    }
  }
  return (
    <>
    <section id={theme?'light':'dark'}>
      {/* <SideBar /> */}
      {MainData.filter((a) => a.embedId === videoID).map(
        ({ Avatar, Name, text, Thumbnail, time, views, embedId }) => {
          return (
            <div>
              <ReactPlayer
                width="100%"
                height="100%"
                url={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1`}
                controls
                playing
              />
              <p className="video-page-name" key={uuidv4()}>
                {text}
              </p>
              <div className="video-page-info">
                <img className="channel-logo" src={Avatar} alt="logo" />
                <p>{Name}</p>

                <div className="video-buttons-container">
                  <button
                    onClick={() => {
                      setVideoLiked(!videoLiked);

                      addtoLiked(Avatar, Name, text, Thumbnail, time, views, embedId)
                    }}
                  >
                    {videoLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>
                  <button
                    className="more-button more-button-video"
                    onClick={(e) => {
                      // handleClick(embedId);
                      e.preventDefault();
                      e.stopPropagation();
                      setMoreModal(!moreModal);
                      checkExistence(embedId);
                      // checkLikedExistence(embedId);
                    }}
                  >
                    <img src={more} alt="more" />
                  </button>
                </div>
                {moreModal && (
                  <MoreModal
                    style={style}
                    // Id={selectedId}
                    Thumbnail={Thumbnail}
                    text={text}
                    Avatar={Avatar}
                    views={views}
                    time={time}
                    Name={Name}
                    WL={InWatchLater}
                    setWL={setInWatchLater}
                  />
                )}
              </div>
            </div>
          );
        }
      )}
      </section>
    </>
  );
};

export default VideoPage;
