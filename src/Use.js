import React, { useState, useRef, useEffect } from "react";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase-config";
import Navbar from "./components/Navbar";
import './Style.css';

const cookies = new Cookies(); // to store login details

const Use = ({ user }) => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInput = useRef(null);
  const [recentRooms, setRecentRooms] = useState([]);

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("recentRooms")) || [];
    setRecentRooms(storedRooms);
  }, []);

  const updateRecentRooms = (newRoom) => {
    const updatedRooms = [newRoom, ...recentRooms.filter(r => r !== newRoom)].slice(0, 5);
    setRecentRooms(updatedRooms);
    localStorage.setItem("recentRooms", JSON.stringify(updatedRooms));
  };

  const enterRoom = () => {
    const roomName = roomInput.current.value;
    setRoom(roomName);
    updateRecentRooms(roomName);
  };

  const signout = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
    setRecentRooms([]); // Reset recent rooms state
    localStorage.removeItem("recentRooms"); // Clear local storage
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "28.5rem" }}>
          <button onClick={() => setIsAuth(true)} className="login-btn">Login</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar user={auth.currentUser} />
      {room ? (
        <div>
          <button onClick={() => setRoom(null)} className="back-btn" style={{marginLeft:"77rem",marginBottom:"-2rem"}}>Back</button>
          <Chat room={room} />
        </div>
      ) : (
        <div>
          <label className="room-name">Enter room name:</label>
          <br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <input ref={roomInput} className="input" placeholder="Room name:" />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
            <button onClick={enterRoom} className="enter-btn">Enter chat</button>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "-15rem" }}>
            <div className="recent">
              <h3 className="room-name2">Recently Visited Rooms:</h3>
              <ul className="btns">
                {recentRooms.map((recentRoom, index) => (
                  <li key={index}>
                    <button onClick={() => setRoom(recentRoom)} className="recent-room-btn">{recentRoom}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15rem", position: "fixed", marginLeft: "76rem" }}>
            <button onClick={isAuth ? signout : () => setIsAuth(true)} className="sign-out">
              {isAuth ? "Sign Out" : "Login"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Use;
