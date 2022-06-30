import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { roomState, showChatState, usernameState } from "../atoms/atom";
import socket from "../socket";

function Createroom() {
  const [room, setRoom] = useRecoilState(roomState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [showChat, setShowChat] = useRecoilState(showChatState);

  useEffect(() => {
    socket.on("roomCreated", (room) => {
      setRoom(room);
    });

    setRoom("");
    setUsername("");
  }, []);

  function handelCreateRoom() {
    console.log(`Created room ${room}`);
    socket.emit("createUser", username);
    socket.emit("joinRoom", { room: room, username: username });
    socket.emit("createRoom", room);
    socket.emit("getAllRooms");
    socket.emit("chatMessage", {
      message: `Welcome ${username} to THECHAT!`,
      roomName: room,
      username: "Admin",
    });
    setShowChat(true);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={{ paddingBottom: 55 }}
    >
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
      <button type="submit" className="btn" onClick={handelCreateRoom}>
        Create room
      </button>
    </form>
  );
}

export default Createroom;
