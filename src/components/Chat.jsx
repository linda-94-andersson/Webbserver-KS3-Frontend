import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  messagesState,
  messageState,
  roomState,
  showChatState,
  usernameState,
} from "../atoms/atom";
import moment from "moment";
import socket from "../socket";
import UsersAndRoom from "./UsersAndRoom";

function Chat() {
  const section = document.querySelector(".chat-messages");
  const room = useRecoilValue(roomState);
  const username = useRecoilValue(usernameState);
  const [message, setMessage] = useSetRecoilState(messageState);
  const [messages, setMessages] = useSetRecoilState(messagesState);
  const [showChat, setShowChat] = useSetRecoilState(showChatState);

  useEffect(() => {
    socket.on("userLeft", () => {});

    socket.on("roomDeleted", () => {});

    socket.on("getAllMessages", (data) => {
      setMessages(data);
    });

    socket.on("sentMessage", (data) => {
      setMessages(data);
    });
  }, []);

  function handelLeaveRoom() {
    console.log(`${username} has left the chatroom ${room}`);
    socket.emit("deleteUser", username);
    setShowChat(false);
  }

  function handelDeleteRoom() {
    console.log(`${room} room deleted`);
    socket.emit("deleteUser", username);
    socket.emit("deleteRoom", room);
    setShowChat(false);
  }

  function handleMessage(message, e) {
    socket.emit("chatMessage", {
      message: message,
      roomName: room,
      username: username,
    });
    setMessage("");
    e.target.focus();
    setTimeout(() => {
      section.scrollTop = section.scrollHeight;
    }, 50);
  }

  const renderMessages = () => {
    if (!messages.length) {
      <div className="message">
        <div className="meta">
          Admin
          <span> {moment().format("HH:mm")}</span>
          <p className="text">Welcome to THECHAT!</p>
        </div>
      </div>;
      return;
    }
    return messages.map((msg) => {
      if (msg.roomName === room) {
        return (
          <div className="message" key={msg.id}>
            <div className="meta">
              {msg.username}
              <span> {msg.date}</span>
              <p className="text">{msg.message}</p>
            </div>
          </div>
        );
      }
      return;
    });
  };

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
        <UsersAndRoom />
        <div className="chat-messages">{renderMessages()}</div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={(e) => e.preventDefault()}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button
            className="btn"
            onClick={(e) => {
              handleMessage(message, e);
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
