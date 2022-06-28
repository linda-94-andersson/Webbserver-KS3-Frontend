import React, { useState, useEffect } from "react";
import socket from "../socket";

function Joinroom(props) {
  useEffect(() => {
    socket.on("Rooms", (rooms) => {
      props.setRooms(rooms);
    });

    socket.emit("getAllRooms", () => {});

    socket.on("joinedRoom", (data) => {
      const { room } = data;
      props.setRoom(room);
    });

    socket.on("username", (user) => {
      props.setUsername(user);
    });
  }, []);

  function handelJoinRoom() {
    console.log(`Joined the room ${props.room}`);
    socket.emit("createUser", props.username);
    socket.emit("joinRoom", props.room);
    props.setShowChat(true); 
  }

  const renderRooms = () => {
    if (!props.rooms.length) return <option>Loading rooms...</option>;
    return props.rooms.map((rooms) => {
      const { id, room } = rooms;
      return (
        <option key={id} value={id}>
          {room}
        </option>
      );
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-control" style={{ paddingTop: 55 }}>
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
        <label htmlFor="room">Join room</label>
        <select id="list" onChange={(e) => props.setRoom(e.target.value)}>
          {renderRooms()}
        </select>
      </div>
      <button type="submit" className="btn" onClick={handelJoinRoom}>
        Join Room
      </button>
    </form>
  );
}

export default Joinroom;
