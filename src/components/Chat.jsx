import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  messagesState,
  messageState,
  roomState,
  showChatState,
  typingState,
  usernameState,
} from "../atoms/atom";
import Emoji from "react-emoji-render";
import socket from "../socket";
import UsersAndRoom from "./UsersAndRoom";

function Chat() {
  const section = document.querySelector(".chat-messages");
  const room = useRecoilValue(roomState);
  const username = useRecoilValue(usernameState);
  const [message, setMessage] = useRecoilState(messageState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [showChat, setShowChat] = useRecoilState(showChatState);
  const [typing, setTyping] = useRecoilState(typingState);

  useEffect(() => {
    socket.on("userLeft", () => {});

    socket.on("roomDeleted", () => {});

    socket.on("getAllMessages", (data) => {
      setMessages(data);
    });

    socket.on("sentMessage", (data) => {
      setMessages(data);
    });

    socket.on("is_typing", ({ typing, username }) => {
      if (typing) setTyping(`${username} is typing...`);
      if (!typing) setTyping("");
    });
  }, []);

  function handelLeaveRoom() {
    console.log(`${username} has left the chatroom ${room}`);
    socket.emit("chatMessage", {
      message: `${username} has left THECHAT!`,
      roomName: room,
      username: "Admin",
    });
    socket.emit("deleteUser", username);
    setShowChat(false);
  }

  function handelDeleteRoom() {
    console.log(`${room} room deleted`);
    socket.emit("deleteUser", username);
    socket.emit("deleteRoom", room);
    setShowChat(false);
  }

  function handleMessage(message) {
    socket.emit("chatMessage", {
      message,
      roomName: room,
      username: username,
    });
    setMessage("");
    setTyping("");
  }

  setTimeout(() => {
    section.scrollTop = section.scrollHeight;
  }, 50);

  const handleTyping = (typing) => {
    socket.emit("handle_typing", {
      typing,
      username: username,
      room: room,
    });
  };

  const renderMessages = () => {
    if (!messages.length) {
      return <p className="text">Nothing to show</p>;
    }
    return messages.map((msg) => {
      if (msg.room_name === room) {
        return (
          <div className="message" key={msg.id}>
            <div className="meta">
              {msg.username}
              <span> {msg.date}</span>
              <p className="text">
                <Emoji text={msg.message} />
              </p>
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
        <span className="text">{typing}</span>
        <form id="chat-form" onSubmit={(e) => e.preventDefault()}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => handleTyping(true)}
            onBlur={() => handleTyping(false)}
          ></input>
          <button
            className="btn"
            onClick={() => {
              handleMessage(message);
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
