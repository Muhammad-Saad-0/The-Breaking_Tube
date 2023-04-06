import React, { useEffect, useState } from "react";
import "../../styles/MoreModal.css";
import { watchLater } from "../../assets/Icons/SideBarIcons";
import {
  doc,
  getDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../../Data/base";
import { useNavigate } from "react-router";

const RemoveWatchLater = ({
  Id
}) => {
 
  const nav = useNavigate()
 
  let user = auth.currentUser;
  const handleDoc = async () => {
    
    const docRef = doc(db, "Watch Later",  `${Id + "+"+auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(
        doc(db, "Watch Later", `${Id + "+"+auth.currentUser.uid}`),
        where("Author", "==", user.uid)
      );

     nav(0)
    }
  };
  return (
    <>
   
      <div className="more-modal remove-modal">
        <button
        name="remove"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDoc();
          }}
        >
          <img src={watchLater} alt="watchLater" />
          Remove from Watch Later
        </button>
      </div>
    </>
  );
};

export default RemoveWatchLater ;
