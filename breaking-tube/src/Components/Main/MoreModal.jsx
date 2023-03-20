import React, { useEffect, useState } from "react";
import "../../styles/MoreModal.css";
import { watchLater } from "../../assets/Icons/SideBarIcons";
import { subscriptions } from "../../assets/Icons/SideBarIcons";
import { useWatchLaterListUpdate } from "../../context/WatchLaterContext";
import { useWatchLaterList } from "../../context/WatchLaterContext";
import WatchLaterVideo from "./WatchLaterVideo";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../../Data/base";
import PlaylistModal from "./PlaylistModal";
import { useNavigate } from "react-router";

const MoreModal = ({
  Id,
  Thumbnail,
  text,
  Avatar,
  views,
  time,
  Name,
  handleRemove,
  WL,
  setWL
}) => {
  const [clickPlaylist, setClickPlaylist] = useState(false);

  const nav = useNavigate();
  useEffect(() => {
    const abc = async () => {
      const docRef = doc(db, "Watch Later", Id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInWatchLater(false);
      }
    };
    //  abc()
  }, []);

  let user = auth.currentUser;
  const handleDoc = async () => {
    const docRef = doc(db, "Watch Later", Id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(
        doc(db, "Watch Later", Id),
        {
          Id,
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
      
    }
   
  };
  const handlePlaylist = () => {
    setClickPlaylist(true);
  };
  // useEffect(() => {
  //   const docRef = doc(db, "Playlist", "adf");
  //   const colRef = collection(docRef, "checkout_sessions");
  //   addDoc(colRef, {
  //     price: 2,
  //     and: 1,
  //     more: "acd",
  //   });
  // }, [clickPlaylist]);
  return (
    <>
      {clickPlaylist && <PlaylistModal   Id={Id}
                                Thumbnail={Thumbnail}
                                text={text}
                                Avatar={Avatar}
                                views={views}
                                time={time}
                                Name={Name}/>}
      <div className="more-modal">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDoc();
            setWL(true)
          }}
          // disabled={WL = true}
          style={
            WL
              ? { backgroundColor: "#4b4b4b" }
              : { backgroundColor: "#212121" }
          }
        >
          <img src={watchLater} alt="watchLater" />
          {WL?'Added to ':'Add to'} Watch Later
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handlePlaylist();
            
          }}
        >
          <img src={subscriptions} alt="playlist" />
          Add to PlayList
        </button>
      </div>
    </>
  );
};

export default MoreModal;
