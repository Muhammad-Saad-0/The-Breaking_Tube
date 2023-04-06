import React, { useEffect, useState } from "react";
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
import { doc, onSnapshot } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { useWatchLaterId } from "../../context/WatchLaterId";
import { v4 as uuidv4 } from "uuid";
import more from "../../assets/Icons/Misc/More.svg";
import { useTheme } from "../../context/ThemeContext";
import RemoveWatchLater from "./RemoveWatchLater";
import '../../styles/Home.css'
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router";
const SinglePlaylist = () => {
  const [moreModal, setMoreModal] = useState(false);
const theme = useTheme()
const [selectedId, setSelectedId] = useState("");
  const handleClick = (embedId) => {
    setSelectedId(embedId);
  };
  const nav = useNavigate()
  const {playlistID} = useParams()
  let user = auth.currentUser;


  const [ro, setRo] = useState([]);
  useEffect(() => {

   auth.onAuthStateChanged(()=>{
    const q = query(
      collection(db, "Playlist",`${playlistID +'+'+ auth.currentUser.uid}`,'videos'),
      where("PlaylistName", "==", playlistID)
    );
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
    };  getVids();
  } )
  
  }, []);
  const handleDel = async (Id)=>{
     const docRef=  doc(db, "Playlist", `${playlistID +'+'+ auth.currentUser.uid}`, "videos", Id)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(
        doc(db, "Playlist", `${playlistID +'+'+ auth.currentUser.uid}`, "videos", Id),
        where("Author", "==", user.uid)
      );

     nav(0)
    }
  }
 
  return (
    <>
      <section className="grid-section"
        id={theme ? "light" : "dark"}
        >
        
        {ro.map((r) => {
          return (
            <Link to={`/video/${r.Id}`} className="video" key={uuidv4()}>
              <div className="video-top">
                
                <div className="thumbnail-section">    <button name="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDel(r.Id)
                  }}
                >
                  <BsFillTrash3Fill />
                </button>
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
                    name="more"
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
          );
        })}
      </section>
    </>
  );
};

export default SinglePlaylist;
