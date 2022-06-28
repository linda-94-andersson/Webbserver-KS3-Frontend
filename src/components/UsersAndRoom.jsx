import React, { useState, useEffect } from "react";
import socket from "../socket";

function UsersAndRoom(props) {
  useEffect(() => {
    // socket.on("roomUsers", ({ room, users }) => {
    //   // console.log(room, " this is undefined room");
    //   // console.log(users, " this is users in roomUsers");
    //   // outputRoomName(room);
    //   // outputUsers(users.username);
    // });

    socket.on("Users", (user) => {
      props.setUsers(user);
    });

    socket.emit("getAllUsers", () => {});
  }, []);

  const renderRooms = () => {
    if (!props.rooms) return <li>Loading rooms...</li>;
    return Array.from(props.rooms).map((r) => {
      const { room } = r;
      return <li key={room}>{room}</li>;
    });
  };

  const renderUsers = () => {
    if (!props.users) return <li>Loading users...</li>;
    return Array.from(props.users).map((user) => {
      const { id, username } = user;
      return <li key={id}>{username}</li>;
    });
  };

  return (
    <div className="chat-sidebar">
      <h3>
        <i className="fas fa-comments"></i> Room Name:
      </h3>
      <h2 id="room-name">{renderRooms()}</h2>
      <h3>
        <i className="fas fa-users"></i> Users
      </h3>
      <ul id="users">{renderUsers()}</ul>
    </div>
  );
}

export default UsersAndRoom;
