import React, { useEffect, useState } from "react";
import { useWatchLaterList } from "../../context/WatchLaterContext";
import WatchLaterVideo from "./WatchLaterVideo";
// import "../../styles/watchLater.css";
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
import { Link } from "react-router-dom";
import { useWatchLaterId } from "../../context/WatchLaterId";
import { v4 as uuidv4 } from "uuid";
import SideBar from "../SideBar/SideBar";
import more from "../../assets/Icons/Misc/More.svg";
import MoreModal from "./MoreModal";
import RemoveWatchLater from "./RemoveWatchLater";
import NoVideos from "./NoVideos";
import { useTheme } from "../../context/ThemeContext";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router";

const Liked = ({ Id }) => {
  const watchLaterId = useWatchLaterId();
  const nav = useNavigate()
  const [empty,setEmpty] = useState(false)
  const [moreModal, setMoreModal] = useState(false);
  const theme = useTheme()
  const [selectedId, setSelectedId] = useState("");
  const handleClick = (embedId) => {
    setSelectedId(embedId);
    console.log(selectedId);
  };

  let user = auth.currentUser;
  const q = query(
    collection(db, "Liked"),
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
              embedId: Vid.data().embedId,
              Name: Vid.data().Name,
              Thumbnail: Vid.data().Thumbnail,
              text: Vid.data().text,
              time: Vid.data().time,
              views: Vid.data().views,
              Avatar: Vid.data().Avatar,
            },
          ]);
        }
      });if(Vids.docs.length === 0){
        setEmpty(true)
      }
    };

    getVids();
  }, []);
  const handleDel = async (Id)=>{
    const docRef = doc(db, "Liked", Id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(
        doc(db, "Liked", Id),
        where("Author", "==", user.uid)
      );

     nav(0)
    }
  }
  // const list = useWatchLaterList();
  return (
    <>
    <h3 style={theme?{color:'#303030'}:{color:'#ffffff'}}>Liked</h3>
      {/* <SideBar /> */}
    {empty?<NoVideos />:  <section className="grid-section"
        id={theme ? "light" : "dark"}>
        {/* <WatchLaterVideo Id={Id} /> */}
        {/* {list} */}
        {ro.map((r) => {
          return (
            <Link to={`/video/${r.embedId}`} className="video" key={uuidv4()}>
              <div className="video-top">
                <div className="thumbnail-section">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDel(r.embedId)
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
                      className="more-button"
                      onClick={(e) => {
                        handleClick(r.embedId);
                        e.preventDefault();
                        e.stopPropagation();
                        setMoreModal(!moreModal);
                      }}
                    >
                      <img src={more} alt="more" />
                    </button>
                    {moreModal && r.embedId === selectedId ? (
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
      </section>}
    </>
  );
};

export default Liked;
