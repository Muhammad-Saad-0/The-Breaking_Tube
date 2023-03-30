import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainData from "../../Data/MainData";
import "../../styles/Home.css";
import HomeFilter from "./HomeFilter";
import { useVideoIdUpdate } from "../../context/videoIdContext";
import { useVideoTitleUpdate } from "../../context/videoTitleContext";
import { v4 as uuidv4 } from "uuid";
import { useFilterId } from "../../context/FilterContext";
import more from "../../assets/Icons/Misc/More.svg";
import MoreModal from "./MoreModal";
import { useWatchLaterIdUpdate } from "../../context/WatchLaterId";
import { db, auth } from "../../Data/base";
import { doc, getDoc, setDoc,query,collection,where,getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import SideBar from "../SideBar/SideBarClose";
import { useCheckLikedUpdate } from "../../context/LikedContext";
import { useCheckLiked } from "../../context/LikedContext";
import { useTheme } from "../../context/ThemeContext";

const VideosGrid = () => {
  const getId = useVideoIdUpdate();
  const getTitle = useVideoTitleUpdate();
  const FilterId = useFilterId();
  const getWatchLaterId = useWatchLaterIdUpdate();
  const setVideoLiked = useCheckLikedUpdate();
  const VideoLiked = useCheckLiked();
  const theme = useTheme();

  let user = auth.currentUser;
  // const handleClick = (e) =>{
  //   e.Stop
  //   console.log('clicked');
  // }
  const [moreModal, setMoreModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [InWatchLater, setInWatchLater] = useState(false);

  const handleClick = async (embedId) => {
    setSelectedId(embedId);
    getWatchLaterId(embedId);
  };
  const handleHistory = async (
    Thumbnail,
    text,
    Avatar,
    views,
    time,
    Name,
    embedId
  ) => {
    // setInWatchLater(!InWatchLater);
    const docRef = doc(db, "History", embedId);
    const docSnap = await getDoc(docRef);
    // if (!docSnap.exists()) {
      await setDoc(
        doc(db, "History", `${embedId +'+'+ auth.currentUser.uid}`),
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
    // }
  };
  const checkExistence = async (embedId) => {
    const docRef = doc(db, "Watch Later", `${embedId + "+"+auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      setInWatchLater(false);
    } else {
      setInWatchLater(true);
    }
  };
  // const [videoLiked, setVideoLiked] = useState(false);
  // const q = query(
  //   collection(db, "Liked",embedId),
  //   where("Author", "==", auth.currentUser.uid)
  // );
  const checkLikedExistence = async (embedId) => {
    // const q = query(
    //     collection(db, "Liked"),
    //     where("Author", "==", auth.currentUser.uid),
    //     where("embedId","==",embedId)
    //   );
    const docRef = doc(db, "Liked", `${embedId + "+"+auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.docs);
    if (!docSnap.exists()) {
      setVideoLiked(false);
    } else {
      setVideoLiked(true);
    }
  };

  return (
    <>
      <HomeFilter />
      {/* <SideBar /> */}
      <section className="grid-section" id={theme ? "light" : "dark"}>
        {FilterId === "All" || !FilterId
          ? MainData.map(
              ({
                Thumbnail,
                text,
                Avatar,
                views,
                time,
                Name,
                embedId,
                Category,
              }) => {
                return (
                  <div key={uuidv4()}>
                    <Link
                      to={`/video/${embedId}`}
                      className="video"
                      onClick={() => {
                        getId(embedId);
                        getTitle(text);
                        handleHistory(
                          Thumbnail,
                          text,
                          Avatar,
                          views,
                          time,
                          Name,
                          embedId
                        );
                        checkLikedExistence(embedId);
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
                              className="more-button"
                              onClick={(e) => {
                                handleClick(embedId);
                                e.preventDefault();
                                e.stopPropagation();
                                setMoreModal(!moreModal);
                                checkExistence(embedId);
                              }}
                            >
                              <img src={more} alt="more" />
                            </button>
                            {moreModal && embedId === selectedId ? (
                              <MoreModal
                                Id={selectedId}
                                Thumbnail={Thumbnail}
                                text={text}
                                Avatar={Avatar}
                                views={views}
                                time={time}
                                Name={Name}
                                WL={InWatchLater}
                                setWL={setInWatchLater}
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
            )
          : MainData.filter((a) => a.Category === FilterId).map(
              ({
                Thumbnail,
                text,
                Avatar,
                views,
                time,
                Name,
                embedId,
                Category,
              }) => {
                return (
                  <div key={uuidv4()}>
                    <Link
                      to={`/video/${embedId}`}
                      className="video"
                      onClick={() => {
                        getId(embedId);
                        getTitle(text);
                        handleHistory(
                          Thumbnail,
                          text,
                          Avatar,
                          views,
                          time,
                          Name,
                          embedId
                        );
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
                              className="more-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleClick(embedId);
                                setMoreModal(!moreModal);
                                checkExistence(embedId);
                              }}
                            >
                              <img src={more} alt="more" />
                            </button>
                            {moreModal && embedId === selectedId ? (
                              <MoreModal
                                Id={selectedId}
                                Thumbnail={Thumbnail}
                                text={text}
                                Avatar={Avatar}
                                views={views}
                                time={time}
                                Name={Name}
                                WL={InWatchLater}
                                setWL={setInWatchLater}
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
      </section>
    </>
  );
};

export default VideosGrid;
