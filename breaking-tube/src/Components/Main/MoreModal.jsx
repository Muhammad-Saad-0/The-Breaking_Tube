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
  useEffect(()=>{
   const abc = async ()=>{
    const docRef = doc(db, "Watch Later", Id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      setInWatchLater(false)
    }
   }
  //  abc()
  },[])
  let user = auth.currentUser;
  // console.log(WL);
  const handleDoc = async () => {
    setInWatchLater(!InWatchLater)
    const docRef = doc(db, "Watch Later", Id);
    const docSnap = await getDoc(docRef);
    // setInWatchLater(docSnap.exists() ? "R" : "A");

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
    //     await setDoc(
    //       doc(db, "Watch Later", Id),
    //       {
    //         Id,
    //         Thumbnail,
    //         text,
    //         Avatar,
    //         views,
    //         time,
    //         Name,
    //         Author: auth.currentUser.uid ,
    //       },
    //       { merge: true }
    //     );
    //     setInWatchLater(prev => !prev)
    //     const docRef = doc(db, "WatchLater", Id);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   console.log("No such document!");
    // }
  };
  // const DeleteDoc = async () => {
  //   const docRef = doc(db, "Watch Later", Id);
  //   const docSnap = await getDoc(docRef);
  //   if(docSnap.exists()){
  //     await deleteDoc(doc(db, "Watch Later", Id))
  //     setInWatchLater(false)
  //   }

  //   }
  // setInWatchLater((prev) => !prev);

  return (
    <>
      <div className="more-modal">
        {/* {InWatchLater? 
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              DeleteDoc();
            }}
          >
            <img src={watchLater} alt="watchLater" />
            Remove from Watch Later
          </button>
         :  */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDoc();
          }}
        >
          <img src={watchLater} alt="watchLater" />
          {InWatchLater?"Remove from":"Add to"} Watch Later
        </button>
        {/* } */}
        {/* {InWatchLater ? 
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              DeleteDoc();
            }}
          >
            <img src={watchLater} alt="watchLater" />
            Remove from Watch Later
          </button>
         : 
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDoc();
            }}
          >
            <img src={watchLater} alt="watchLater" />
            Add to Watch Later
          </button>
        } */}
        {/* <WatchLaterVideo Id={Id} /> */}

        <button>
          <img src={subscriptions} alt="playlist" />
          Add to PlayList
        </button>
      </div>
    </>
  );
};

export default MoreModal;
