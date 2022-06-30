import React, { useEffect } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { showChatState } from "./atoms/atom";
import Createroom from "./components/Createroom";
import Joinroom from "./components/Joinroom";
import Chat from "./components/Chat";
import socket from "./socket";

function App() {
  const showChat = useRecoilValue(showChatState);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to socketID ${socket.id}`);
    });

    socket.emit("getAllUsers", () => {});

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
            <Createroom />
            ...or join an existing room!
            <Joinroom />
          </main>
        </div>
      ) : (
        <Chat />
      )}
    </RecoilRoot>
  );
}

export default App;
