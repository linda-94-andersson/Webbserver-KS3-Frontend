import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomState, roomsState } from "../atoms/atom";
import socket from "../socket";

function Createroom(props) {
  const [room, setRoom] = useRecoilState(roomState);
  const [rooms, setRooms] = useRecoilState(roomsState);

  useEffect(() => {
    socket.on("roomCreated", (room) => {
      setRoom(room);
    });
  }, []);

  function handelCreateRoom() {
    console.log(`Created room ${room}`);
    socket.emit("createUser", props.username);
    socket.emit("joinRoom", { room: room, username: props.username });
    socket.emit("createRoom", room);
    socket.emit("getAllRooms");
    props.setShowChat(true);
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
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
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
