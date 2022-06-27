import React, { useState, useEffect } from "react";
import socket from "../socket";

function UsersAndRoom(props) {
  const roomName = document.getElementById("room-name");
  const userList = document.getElementById("users");

  useEffect(() => {
    socket.on("roomUsers", ({ room, users }) => {
      console.log(room, " this is undefined room");
      console.log(users, " this is users in roomUsers");
      outputRoomName(room);
      outputUsers(users.username);
    });

    return () => {
      socket.off("roomUsers");
    };
  }, []);

  function outputRoomName(room) {
    roomName.innerText = room;
    return room;
  }

  function outputUsers(users) {
    userList.innerHTML = `
    ${Array.from(users)
      .map((user) => `<li>${user.username}</li>`)
      .join("")}
    `;
    return users;
  }

  return (
      <div className="chat-sidebar">
        <h3>
          <i className="fas fa-comments"></i> Room Name:
        </h3>
        <h2 id="room-name">{props.room}</h2>
        <h3>
          <i className="fas fa-users"></i> Users
        </h3>
        <ul id="users">
          <li>{props.username}</li>
        </ul>
      </div>
  );
}

export default UsersAndRoom;
