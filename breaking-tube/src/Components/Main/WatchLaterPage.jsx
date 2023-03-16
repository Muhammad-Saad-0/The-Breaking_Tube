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

const WatchLater = ({ Id }) => {
  const watchLaterId = useWatchLaterId();

  const [t, setT] = useState("");

  // useEffect(() => {
  //   const data = onSnapshot(doc(db, "Watch Later", `${watchLaterId}`), (doc) => {
  //     // console.log("Current data: ", doc.data().text);
  //     setT(doc.data());
  //   });
  // }, []);
  // console.log(watchLaterId);
  // const docRef = doc(db, "Watch Later");
  // const abc = async ()=>{
  //   const docSnap = await getDoc(docRef);
  // // docSnap.then(forEach(doc => {
  //     console.log(docSnap.data());
  // // }))
  // }
  // abc()

  // const docRef = doc(db, "Watch Later");
  //   const abc = async () => {
  //     const docSnap = await getDocs(colRef);
  // console.log(docSnap);
  //     docSnap.forEach((doc) => {
  //       setT(doc.data());
  //     });
  //   };
  //   useEffect(() => {
  //     abc();
  //   // console.log(t);

  //   }, []);

  // abc()

  //   try {
  //     const docsSnap = await getDocs(colRef);
  //     if(docsSnap.docs.length > 0) {
  //        docsSnap.forEach(doc => {
  //           console.log(doc.data());
  //           console.log(doc.id);
  //        })
  //     }
  // } catch (error) {
  //     console.log(error);
  // }

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  // console.log(t);
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
  );
};

export default WatchLater;
