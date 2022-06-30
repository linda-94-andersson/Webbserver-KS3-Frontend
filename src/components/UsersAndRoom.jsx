import React, { useState, useEffect } from "react";
import socket from "../socket";
import { useRecoilValue } from "recoil";
import { roomState } from "../atoms/atom";

function UsersAndRoom(props) {
  const [activeUsers, setActiveUsers] = useState([]);
  const room = useRecoilValue(roomState);

  useEffect(() => {
    socket.emit("getActiveUsers", { room: room, username: props.username });

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

    return activeUsers.map((room_name) => {
      if (room_name.active_room === room) {
        return <li key={room_name.username}>{room_name.username}</li>;
      }
      return;
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
