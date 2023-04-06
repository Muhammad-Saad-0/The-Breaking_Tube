import React, { useEffect, useState } from "react";
import "../../styles/MoreModal.css";
import { watchLater } from "../../assets/Icons/SideBarIcons";
import { subscriptions } from "../../assets/Icons/SideBarIcons";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  where,
  getDocs,
  query,
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
  handleRemove,
  WL,
  setWL,
  style
}) => {
  const [clickPlaylist, setClickPlaylist] = useState(false);
  const [playlistNameListDB, setPlaylistNameListDB] = useState([]);

  let user = auth.currentUser;
  const handleDoc = async () => {
    const docRef = doc(db, "Watch Later", `${Id + "+"+user.uid}`);
      await setDoc(
        doc(db, "Watch Later",  `${Id + "+" +user.uid}`),
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
   
  };
  const handlePlaylist = () => {
    setClickPlaylist(true);
  };

  const q = query(
    collection(db, "Playlist"),
    where("Author", "==", user.uid)
  );
  const getPlaylistNames = async () => {
    const Playlists = await getDocs(q);
    Playlists.forEach((Playlist) => {
      setPlaylistNameListDB((r) =>
        [...r, [Playlist.data().Name]]
        .slice(0, Playlists.docs.length)
      );
    });}
  return (
    <>
      {clickPlaylist && <PlaylistModal   Id={Id}
                                Thumbnail={Thumbnail}
                                text={text}
                                Avatar={Avatar}
                                views={views}
                                time={time}
                                Name={Name}
                                closePlaylist = {setClickPlaylist}
                                playlistNameListDB={playlistNameListDB}
                                />
                                }
      <div className="more-modal" style={style} >
        <button
        name="add to watch later"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDoc();
            setWL(true)
          }}
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
        name="add to playlist"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handlePlaylist();
              getPlaylistNames();
           
            
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
