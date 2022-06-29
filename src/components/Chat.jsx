import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomState, roomsState } from "../atoms/atom";
import socket from "../socket";
import UsersAndRoom from "./UsersAndRoom";

function Chat(props) {
  const section = document.querySelector(".chat-messages");
  const [room, setRoom] = useRecoilState(roomState);
  const [rooms, setRooms] = useRecoilState(roomsState);

  useEffect(() => {
    socket.on("userLeft", () => {});

    socket.on("roomDeleted", () => {});

    socket.on("sentMessage", (data) => {
      props.setMessages(data);
    });
  }, []);

  function handelLeaveRoom() {
    console.log(`${props.username.username} has left the chatroom ${room}`);
    socket.emit("deleteUser", props.username);
    props.setShowChat(false);
  }

  function handelDeleteRoom() {
    console.log(`${room} room deleted`);
    socket.emit("deleteUser", props.username);
    socket.emit("deleteRoom", room);
    props.setShowChat(false);
  }

  function handleMessage(message) {
    console.log("message sent");
    socket.emit("chatMessage", {
      message,
      roomName: room,
      username: props.username,
    });
  }

  const renderMessages = () => {
    if (!props.messages.length)
      return (
        <div className="message">
          <div className="meta">
            Admin
            <span> time here</span>
            <p className="text">Welcome to THECHAT!</p>
          </div>
        </div>
      );
    return props.messages.map((msg) => {
      const { id, message, username, date } = msg;
      return (
        <div className="message" key={id}>
          <div className="meta">
            {username}
            <span> {date}</span>
            <p className="text">{message}</p>
          </div>
        </div>
      );
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
        <UsersAndRoom username={props.username} />
        <div className="chat-messages">{renderMessages()}</div>
      </main>
      <div className="chat-form-container">
        <form
          id="chat-form"
          onSubmit={(e) => (
            e.preventDefault(), (section.scrollTop = section.scrollHeight)
          )}
        >
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={props.message}
            onChange={(e) => props.setMessage(e.target.value)}
            onClick={(e) => {
              (e.target.value = ""), e.target.focus();
            }}
          />
          <button
            className="btn"
            onClick={() => {
              handleMessage(props.message);
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
