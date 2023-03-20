import React, { useState } from "react";
import "../../styles/PlaylistModal.css";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlusSquare } from "react-icons/ai";
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
const PlaylistModal = ({
  Id,
  Thumbnail,
  text,
  Avatar,
  views,
  time,
  Name,
  handleRemove,
}) => {
  const [playlistNameList, setPlaylistNameList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    {
      playlistNameList.map(async (a) => {
        const docRef = doc(db, "Playlist", a, "videos", Id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(
            doc(db, "Playlist", a, "videos", Id),
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
        }
      });
    }
  };
  const handleListDb = () => {
    {
      playlistNameList.map(async (a) => {
        const docRef = doc(db, "Playlist", a);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(
            doc(db, "Playlist", a),
            {
              a
            },
            { merge: true }
          );
        }
      });
    }
  };
  return (
    <section
      className="playlist-modal-section"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <section className="playlist-modal">
        <div className="playlist-modal-top">
          <h4>Create Playlist</h4>
          <button className="close-playlist-modal">
            <RxCross2 />{" "}
          </button>
        </div>
        <ul>
          {playlistNameList.map((a) => {
            return (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <button
                  type="checkbox"
                  id={`${a}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClick();
                  }}
                >
                  <AiOutlinePlusSquare />
                  {a}
                </button>
              </li>
            );
          })}
        </ul>
        <form>
          {playlistNameList.length >= 8 && (
            <i style={{ color: "	rgb(255, 51, 51)" }}>
              Maximum number of Playlists reached
            </i>
          )}
          <input
            type="text"
            placeholder="Name of Playlist..."
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }}
            value={playlistName}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPlaylistNameList([...playlistNameList, playlistName]);
              setPlaylistName("");
              e.preventDefault();
              console.log(playlistNameList);
              handleListDb();
            }}
            disabled={playlistNameList.length >= 8}
          >
            Enter
          </button>
        </form>
      </section>
    </section>
  );
};

export default PlaylistModal;
