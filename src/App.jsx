import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chat from "./components/Chat";
import socket from "./socket";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  // console.log(username, " this is username");
  // console.log(room, " this is room");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to socketID ${socket.id}`);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Server disconnected. Reason ${reason}`);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  function joinRoom() {
    console.log("Joined the room");
    socket.connect();
    socket.emit("joinRoom", username, room);
  }

  // onsubmit="return validation()"
  // function validation() {
  //   let room = document.getElementById("room");
  //   let listOptions = document.querySelectorAll("#list option");

  //   for (let i = 0; i < listOptions.length; i++) {
  //     if (listOptions[i].value === room.value) {
  //       alert("The room already exist");
  //     }
  //   }
  //   return false;
  // }

  return (
    <>
      <div className="join-container">
        <header className="join-header">
          <h1>
            <i className="fas fa-smile"></i> THECHAT
          </h1>
        </header>
        <main className="join-main">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="room">Room name</label>
              <input
                type="text"
                name="room"
                id="room"
                placeholder="Enter room name..."
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn" onClick={joinRoom}>
              Create room
            </button>
            {/* <Link to="/chat" room={room} username={username}>
          </Link> */}
            <div className="form-control" style={{ paddingTop: 55 }}>
              <label htmlFor="room">...or choose from an existing room</label>
              {/* <input
              type="text"
              name="room"
              id="room"
              placeholder="Choose a  room..."
              value={list}
            /> */}
              <select id="list" onChange={(e) => setRoom(e.target.value)}>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <button type="submit" className="btn" onClick={joinRoom}>
              Join Chat
            </button>
            {/* <Link to="/chat" >
          </Link> */}
          </form>
        </main>
      </div>
      <Chat room={room} username={username} />
    </>
  );
}

export default App;
