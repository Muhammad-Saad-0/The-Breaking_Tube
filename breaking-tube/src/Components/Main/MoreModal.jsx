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
const MoreModal = ({
  Id,
  Thumbnail,
  text,
  Avatar,
  views,
  time,
  Name,
  embedId,
  WL,
}) => {
  const [InWatchLater, setInWatchLater] = useState(false);
  const [clickPlaylist,setClickPlaylist] = useState(false)
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
    setInWatchLater(!InWatchLater);
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
      // setInWatchLater("Add to");
    }
    if (docSnap.exists()) {
      await deleteDoc(
        doc(db, "Watch Later", Id),
        where("Author", "==", user.uid)
      );
      setInWatchLater(true);
    }
  };
  const handlePlaylist = () => {
setClickPlaylist(true)
    
  };
  useEffect(()=>{
    const docRef = doc(db, "Playlist",'adf');
    const colRef = collection(docRef, "checkout_sessions")
    addDoc(colRef, {
     price: 2,
     and: 1,
     more: 'acd',
    });
  },[clickPlaylist])
  return (
    <>
    {clickPlaylist&& <PlaylistModal/> }
      <div className="more-modal">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDoc();
          }}
        >
          <img src={watchLater} alt="watchLater" />
          {InWatchLater ? "Remove from" : "Add to"} Watch Later
        </button>
        <button  onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handlePlaylist();
            }}>
          <img
            src={subscriptions}
            alt="playlist"
           
          />
          Add to PlayList
        </button>
      </div>
    </>
  );
};

export default MoreModal;
