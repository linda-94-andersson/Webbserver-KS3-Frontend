import React, { useState, useEffect } from "react";
import Createroom from "./components/Createroom";
import Joinroom from "./components/Joinroom";
import Chat from "./components/Chat";
import socket from "./socket";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  socket.connect();

  return !showChat ? (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> THECHAT
        </h1>
        <br />
        <span>Welcome to THECHAT! Create a room to start!</span>
      </header>
      <main className="join-main">
        <Createroom
          setShowChat={setShowChat}
          setUsername={setUsername}
          setRoom={setRoom}
          setRooms={setRooms}
          username={username}
          room={room}
          rooms={rooms}
        />
        ...or join an existing room!
        <Joinroom
          setShowChat={setShowChat}
          setUsername={setUsername}
          setRoom={setRoom}
          setRooms={setRooms}
          username={username}
          room={room}
          rooms={rooms}
        />
      </main>
    </div>
  ) : (
    <Chat setShowChat={setShowChat} username={username} room={room} rooms={rooms} setUsers={setUsers} users={users} />
  );
}

export default App;
