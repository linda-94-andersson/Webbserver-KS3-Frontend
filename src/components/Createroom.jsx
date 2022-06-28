import React, { useState, useEffect } from "react";
import socket from "../socket";

function Createroom(props) {
  useEffect(() => {
    socket.on("roomCreated", (room) => {
      props.setRoom(room);
    });

    socket.on("Rooms", (rooms) => {
      props.setRooms(rooms);
    });

    socket.on("username", (user) => {
      props.setUsername(user);
    });

    socket.on("joinedRoom", (data) => {
      const { room } = data;
      props.setRoom(room);
    });

    socket.emit("getAllRooms", () => {});
  }, []);

  function handelCreateRoom() {
    console.log(`Created room ${props.room}`);
    socket.emit("createRoom", props.room);
    socket.emit("createUser", props.username);
    socket.emit("joinRoom", props.room);
    socket.emit("getAllRooms");
    props.setShowChat(true);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ paddingBottom: 55 }}>
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
          value={props.room}
          onChange={(e) => props.setRoom(e.target.value)}
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
