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
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router";
import NoVideos from "./NoVideos";

const Playlist = ({ Id }) => {
  const nav = useNavigate()
  const [empty,setEmpty] = useState(false)

  const watchLaterId = useWatchLaterId();
  const [moreModal, setMoreModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const handleClick = (embedId) => {
    setSelectedId(embedId);
  };
  const theme = useTheme();
  let user = auth.currentUser;
  const q = query(collection(db, "Playlist"), where("Author", "==", user.uid));

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
              Thumbnail: Vid.data().Thumbnail,
            },
          ]);
        }
      });
      if(Vids.docs.length === 0){
        setEmpty(true)
      }
    };

    getPlaylist();
  }, []);
  const handleDel = async (Id)=>{
    const docRef = doc(db, "Playlist", `${Id +'+'+ auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(
        doc(db, "Playlist", `${Id +'+'+ auth.currentUser.uid}`),
        where("Author", "==", user.uid)
      );

     nav(0)
    }
  }
  return (
    <>
      <h3 style={theme ? { color: "#303030" } : { color: "#ffffff" }}>
        Playlists
      </h3>
      {empty?<NoVideos /> :<section
        className="playlist-page video-grid"
        id={theme ? "light" : "dark"}
      >
        {playlistName.map((r) => {
          return (
            <Link to={`/playlist/${r.Name}`} className="video" key={uuidv4()}>
              <div>
                {" "}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDel(r.Name)
                  }}
                >
                  <BsFillTrash3Fill />
                </button>
                <span>
                  <p>{r.Name}</p>
                </span>
                <img src={r.Thumbnail} />
              </div>
            </Link>
          );
        })}
      </section>}
    </>
  );
};

export default Playlist;
