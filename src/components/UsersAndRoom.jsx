import React, { useState, useEffect } from "react";
import socket from "../socket";
import { useRecoilValue } from "recoil";
import { roomState } from "../atoms/atom";

function UsersAndRoom() {
  const [activeUsers, setActiveUsers] = useState([]);
  const room = useRecoilValue(roomState);

  useEffect(() => {
    socket.on("usersActive", (data) => {
      setActiveUsers(data);
    });
  }, []);

  const renderRooms = () => {
    if (!room) {
      return <li>No room found</li>;
    }
    return <li key={room}>{room}</li>;
  };

  const renderUsers = () => {
    if (!activeUsers) return <li>Loading users...</li>;
    return activeUsers.map((user) => {
      return <li key={user.username}>{user.username}</li>;
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
