import React from "react";
import { useEffect, useState } from "react";
import "../../styles/history.css";
import { db, colRef, auth } from "../../Data/base";
import {
  getDocs,
  collection,
  Firestore,
  where,
  query,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import { async } from "@firebase/util";
import { BsFillTrash3Fill } from "react-icons/bs";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NoVideos from "./NoVideos";
import { useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext";
const History = () => {
  let user = auth.currentUser;
  console.log(user.uid);
  const theme = useTheme()
  const q = query(collection(db, "History"), where("Author", "==", user.uid));
  const [empty,setEmpty] = useState(false)

  const nav = useNavigate()
  const [ro, setRo] = useState([]);
  useEffect(() => {
    const getVids = async () => {
      const Vids = await getDocs(
        // collection(db, "Watch Later"
        // ,where("Author", "==", user.uid)
        q
      );
      // .where("author", "==", user.uid)
      Vids.forEach((Vid) => {
        if (Vids.docs.length != ro.length) {
          setRo((r) => [
            ...r,
            {
              Id: Vid.data().embedId,
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
  const handleDel = async (Id)=>{
    const docRef = doc(db, "History", Id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(
        doc(db, "History", Id),
        where("Author", "==", user.uid)
      );

     nav(0)
    }
  }
  return (
  <>
  <h3 style={theme?{color:'#303030'}:{color:'#ffffff'}}>History</h3>
    {empty?<NoVideos />:<section className="grid-section"
        id={theme ? "light" : "dark"}
    
    >
      {/* <WatchLaterVideo Id={Id} /> */}
      {/* {list} */}
      {ro.map((r) => {
        return (
          <Link to={`/video/${r.Id}`} className="video" key={uuidv4()}>
            <div className="video-top">

              <div className="thumbnail-section">
              <button
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
                    className="more-button"
                    onClick={(e) => {
                      // handleClick(embedId);
                      e.preventDefault();
                      e.stopPropagation();
                      // setMoreModal(!moreModal);
                    }}
                  >
                    {/* <img src={more} alt="more" /> */}
                  </button>
                  {/* {moreModal && embedId === selectedId ? (
                           <MoreModal
                             Id={selectedId}
                             Thumbnail={Thumbnail}
                             text={text}
                             Avatar={Avatar}
                             views={views}
                             time={time}
                             Name={Name}
                           />
                         ) : (
                           false
                         )} */}
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

export default History;
