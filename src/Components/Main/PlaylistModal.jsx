import React, { useEffect, useState } from "react";
import "../../styles/PlaylistModal.css";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlusSquare } from "react-icons/ai";
import {
  doc,
  setDoc,
  getDoc,
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
  closePlaylist,
  playlistNameListDB
}) => {
  const [playlistNameList, setPlaylistNameList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
 
const [btn,setBtn] = useState(true)
const handleRefresh = ()=>{
  setPlaylistNameList(playlistNameListDB);
  setBtn(false)

}
  const handleClick = async (a) => {
        const docRef = doc(db, "Playlist",`${a +'+'+ auth.currentUser.uid}`  , "videos", Id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(
            doc(db, "Playlist", `${a +'+'+ auth.currentUser.uid}`, "videos", Id),
            {
              Id,
              Thumbnail,
              text,
              Avatar,
              views,
              time,
              Name,
              Author: auth.currentUser.uid,
              PlaylistName : a.toString()
            },
            { merge: true }
          );
        }
    
  };

  useEffect(() => {
    const handleListDb = () => {
      {
        playlistNameList.map(async (N) => {
          const docRef = doc(db, "Playlist", `${N + "+"+auth.currentUser.uid}`);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(
              doc(db, "Playlist", `${N + "+"+auth.currentUser.uid}`),
              {
                Name:N,
                Author: auth.currentUser.uid,
                Thumbnail,
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
          name="close"
            className="close-playlist-modal"
            onClick={() => {
              closePlaylist(false);
            }}
          >
            <RxCross2 />{" "}
          </button>
        </div>
       {btn&& <button onClick={handleRefresh} name="refresh">
          Refresh
        </button>}
        <ul>
          {playlistNameList.map((a) => {
            return (
              <li>
                <button
                name="playlist"
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
          name="enter"
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
