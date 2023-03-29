import React, { useEffect, useState } from "react";
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
  getDocs,
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
  closePlaylist,
  playlistNameListDB
}) => {
  const [playlistNameList, setPlaylistNameList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  // const [playlistNameListDB, setPlaylistNameListDB] = useState([]);

  // useEffect(() => {
    // const getPlaylistNames = async () => {
    //   const docRef = collection(db, "Playlist");
    //   const Playlists = await getDocs(docRef);
    //   Playlists.forEach((Playlist) => {
    //     setPlaylistNameListDB((r) =>
    //       [...r, [Playlist.data().Name]]
    //       .slice(0, Playlists.docs.length)
    //     );
    //   });
setInterval(() => {
  setPlaylistNameList(playlistNameListDB);
  
}, 1000);
    // };
    // getPlaylistNames();
  // }, []);
  const handleClick = async (a) => {
    { console.log(a[0]);
      // playlistNameList.map(async () => {
        const docRef = doc(db, "Playlist",a[0]  , "videos", Id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(
            doc(db, "Playlist",  a[0], "videos", Id),
            {
              Id,
              Thumbnail,
              text,
              Avatar,
              views,
              time,
              Name,
              Author: auth.currentUser.uid,
              PlaylistName : a[0]
            },
            { merge: true }
          );
        }
        // console.log(a);
      // });
    }
  };
  useEffect(() => {
    const handleListDb = () => {
      {
        console.log(playlistNameList);
        playlistNameList.map(async (N) => {
        console.log(N);

          const docRef = doc(db, "Playlist", N);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(
              doc(db, "Playlist", N),
              {
                Name:N,
                Author: auth.currentUser.uid
              },
              { merge: true }
            );
          }
        });
      }
    };
    handleListDb();
  }, [playlistNameList]);

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
          <button
            className="close-playlist-modal"
            onClick={() => {
              closePlaylist(false);
            }}
          >
            <RxCross2 />{" "}
          </button>
        </div>
        <ul>
          {playlistNameList.map((a) => {
            return (
              <li>
                <button
                  type="checkbox"
                  id={`${a}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClick(a);
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
              e.stopPropagation()
              e.preventDefault()
              
            }} 
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            value={playlistName}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPlaylistNameList([...playlistNameList, playlistName]);
              setPlaylistName("");
              e.preventDefault();
            }}
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}

            disabled={playlistNameList.length >= 8 || playlistName === ""}
          >
            Enter
          </button>
        </form>
      </section>
    </section>
  );
};

export default PlaylistModal;
