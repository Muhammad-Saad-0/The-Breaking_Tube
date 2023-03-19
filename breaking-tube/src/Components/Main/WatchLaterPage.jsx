import React, { useEffect, useState } from "react";
import { useWatchLaterList } from "../../context/WatchLaterContext";
import WatchLaterVideo from "./WatchLaterVideo";
import "../../styles/watchLater.css";
import { db, colRef, auth } from "../../Data/base";
import { getDocs, collection, Firestore ,where,query} from "firebase/firestore";
import { async } from "@firebase/util";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useWatchLaterId } from "../../context/WatchLaterId";
import { v4 as uuidv4 } from "uuid";
import SideBar from "../SideBar/SideBar";

const WatchLater = ({ Id }) => {
  const watchLaterId = useWatchLaterId();

  const [t, setT] = useState("");


  const list = useWatchLaterList();
  let user = auth.currentUser;
  const q = query(collection(db, "Watch Later"), where("Author", "==", user.uid));

  const [ro, setRo] = useState([]);
  useEffect(() => {
    const getVids = async () => {
      const Vids = await getDocs(
        // collection(db, "Watch Later"
        // ,where("Author", "==", user.uid)
        q)
        // .where("author", "==", user.uid)
      ;
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
    };

    getVids();
  }, []);

  //  ro.map((r)=>{
  // console.log(r.Name);
  //  })
  // const list = useWatchLaterList();
  return (
   <>
   {/* <SideBar /> */}
    <section className="watchlater-section">
      {/* <WatchLaterVideo Id={Id} /> */}
      {/* {list} */}
      {ro.map((r) => {
        return (
          <Link to={`/video/${r.Id}`} className="video" key={uuidv4()}>
            <div className="video-top">
              <div className="thumbnail-section">
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
    </section>
   </>
  );
};

export default WatchLater;
