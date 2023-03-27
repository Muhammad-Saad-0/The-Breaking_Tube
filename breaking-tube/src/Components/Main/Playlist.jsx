import React, { useEffect, useState } from "react";
import { useWatchLaterList } from "../../context/WatchLaterContext";
import WatchLaterVideo from "./WatchLaterVideo";
import "../../styles/watchLater.css";
import { db, colRef, auth } from "../../Data/base";
import {
  getDocs,
  collection,
  Firestore,
  where,
  query,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { doc, onSnapshot } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { useWatchLaterId } from "../../context/WatchLaterId";
import { v4 as uuidv4 } from "uuid";
import SideBar from "../SideBar/SideBar";
import more from "../../assets/Icons/Misc/More.svg";
import MoreModal from "./MoreModal";
import RemoveWatchLater from "./RemoveWatchLater";
import "../../styles/Playlist.css";
import { useTheme } from "../../context/ThemeContext";
const Playlist = ({ Id }) => {
  const watchLaterId = useWatchLaterId();
  const [moreModal, setMoreModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const handleClick = (embedId) => {
    setSelectedId(embedId);
  };
const theme = useTheme()
  let user = auth.currentUser;
  const q = query(collection(db, "Playlist"));

  const [playlistName, setPlaylistName] = useState([]);
  useEffect(() => {
    const getPlaylist = async () => {
      const Vids = await getDocs(q);
      console.log(Vids.docs.length);
      Vids.forEach((Vid) => {
        if (Vids.docs.length != playlistName.length) {
          setPlaylistName((r) => [
            ...r,
            {
              Name: Vid.data().Name,
            },
          ]);
        }
      });
    };

    getPlaylist();
  }, []);
  // const [playlistThumbnail, setPlaylistThumbnail] = useState([]);

  // useEffect(() => {
  //   const getPlaylistThumbnail = () => {
  //     playlistName.map(async (name) => {
  //       console.log(Object.values(name)[0]);

  //       const q2 = query(collection(db, "Playlist", Object.values(name)[0], "videos"));
  //       const Vids = await getDocs(q2);
  //       Vids.forEach((Vid) => {
  //         setPlaylistThumbnail((r) => [
  //           ...r,
            
  //            Vid.data().Thumbnail,
  //           ,
  //         ].slice(0,Vids.docs.length + 1));
  //         // }
  //       });
  //     });
  //   };

  //   getPlaylistThumbnail();
 
  // }, []);
  // console.log(playlistThumbnail);
  // const arr = [playlistName,playlistThumbnail]
  // console.log(arr);
  return (
    <>
    <h3 style={theme?{color:'#303030'}:{color:'#ffffff'}}>Playlists</h3>
      <section className="playlist-page" id={theme?'light':'dark'}>
        {playlistName.map((r) => {
          return (
            <Link to={`/playlist/${r.Name}`} className="video" key={uuidv4()}>
            <div>
            <span>
              <p>{r.Name}</p>

              </span>
         
              <img src='https://i3.ytimg.com/vi/40tX4s5Ecwc/maxresdefault.jpg'/>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default Playlist;
