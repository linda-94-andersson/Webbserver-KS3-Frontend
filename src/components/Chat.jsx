import React, { useState, useEffect } from "react";
import socket from "../socket";
import UsersAndRoom from "./UsersAndRoom";

function Chat(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //   console.log(message, " this is message singlaur");
  //   console.log(messages, " this is messages plural");
  //   const [username, setUsername] = useState("");
  //   const [room, setRoom] = useState("");

  // console.log(props.room, " this is props room");
  // console.log(props.username, " this is props username");

  //   const chatMessages = document.querySelector(".chat-messages");

  useEffect(() => {
    socket.emit("userLeft", () => {});

    socket.on("message", (msg) => {
      //   outputMessage(message);
      setMessages(msg);
      console.log(msg, " this is msg");
      //   chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }, []);

  //   function outputMessage(message) {
  //     const div = document.createElement("div");
  //     div.classList.add("message");
  //     div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  //     <p class="text">
  //        ${message.text}
  //     </p>`;
  //     document.querySelector(".chat-messages").appendChild(div);
  //   }

  function handleMessage(e, message) {
    console.log("message sent");
    e.preventDefault();
    socket.emit("chatMessage", message);
    e.target.value = "";
    e.target.focus();
  }

  function handelLeaveRoom() {
    console.log(`${props.username} has left the chatroom ${props.room}`);
    props.setShowChat(false);
    socket.emit("deleteUser");
  }

  function handelDeleteRoom() {
    console.log("Room deleted");
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> THECHAT
        </h1>
        <div className="chat-header">
          <button className="btn" onClick={handelDeleteRoom}>
            Delete Room
          </button>
        </div>
        <button className="btn" onClick={handelLeaveRoom}>
          Leave Room
        </button>
      </header>
      <main className="chat-main">
        <UsersAndRoom
          room={props.room}
          username={props.username}
          rooms={props.rooms}
          setUsers={props.setUsers}
          users={props.users}
        />
        <div className="chat-messages">
          {messages &&
            Array.from(messages).map((message) => {
              return (
                <div className="message" key={message}>
                  {/* <p className="meta">{message.username.username}</p> */}
                  {/* <span>{message.time}</span> */}
                  <p className="text">{message}</p>
                </div>
              );
            })}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn"
            onClick={(e) => {
              handleMessage(e, message);
            }}
          >
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
