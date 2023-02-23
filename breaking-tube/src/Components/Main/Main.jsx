import React from "react";
import MainFilter from "../Main/MainFilter";
import MainData from "../../Data/MainData";
import "../../styles/Main.css";
import NavBar from "../NavigationBar/NavBar";
import SideBar from "../SideBar/SideBar";

const Main = () => {
  return (
    <>
      
      <NavBar />
      <MainFilter />
      <SideBar />

      <section className="main-section">
        <section className="grid-section">
          {MainData.map(({ Thumbnail, text, Avatar, views, time, Name }) => {
            return (
              <>
                <article key={Name} className="video">
                  <div className="video-top">
                    <div className="thumbnail-section">
                      <img src={Thumbnail} alt={text} />
                    </div>
                  </div>
                  <div className="video-bottom">
                    <div className="video-bottom-top">
                      <img src={Avatar} alt="Avatar" />
                    </div>
                    <div className="video-info-section">
                      <p> {text}</p>
                      <p>{Name}</p>
                      <div className="video-info">
                        <p> {views}</p>
                        <p className="time"> {time}</p>
                      </div>
                    </div>{" "}
                  </div>
                </article>
              </>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default Main;
