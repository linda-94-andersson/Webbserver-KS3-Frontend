import React, { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
import Createroom from "./components/Createroom";
import Joinroom from "./components/Joinroom";
import Chat from "./components/Chat";
import socket from "./socket";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to socketID ${socket.id}`);
    });

    socket.emit("getAllUsers");

    socket.on("disconnect", (reason) => {
      console.log(`Server disconnected. Reason ${reason}`);
    });
    return () => {
      socket.off();
    };
  }, []);

  socket.connect();

  return (
    <RecoilRoot>
      {!showChat ? (
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
              username={username}
              setUsername={setUsername}
              users={users}
              setUsers={setUsers}
            />
            ...or join an existing room!
            <Joinroom
              setShowChat={setShowChat}
              username={username}
              setUsername={setUsername}
              users={users}
              setUsers={setUsers}
            />
          </main>
        </div>
      ) : (
        <Chat
          setShowChat={setShowChat}
          username={username}
          users={users}
          setUsers={setUsers}
          message={message}
          setMessage={setMessage}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </RecoilRoot>
  );
}

export default App;
