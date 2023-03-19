import React, { useState } from "react";
import "../../styles/PlaylistModal.css";
import {ImCheckboxUnchecked,ImCheckboxChecked} from 'react-icons/im'
const PlaylistModal = () => {
  const [playlistNameList, setPlaylistNameList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [ checked,setChecked] = useState(false)
  return (
    <section
      className="playlist-modal-section"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <section className="playlist-modal">
        <h4>Create Playlist</h4>

        <ul>
          {playlistNameList.map((a) => {
            return (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {checked?<ImCheckboxUnchecked />:<ImCheckboxChecked />}
                <input
                  type="checkbox"
                  id="option"
                  onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation()
                    setChecked(!checked)
                    console.log(checked);
                  }}
                  
                />
                <label htmlFor="option">
                  {a}{" "}
                </label>
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
