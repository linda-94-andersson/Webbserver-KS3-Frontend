import React from "react";

function UsersAndRoom(props) {
  return (
    <main class="chat-main">
      <div class="chat-sidebar">
        <h3>
          <i class="fas fa-comments"></i> Room Name:
        </h3>
        <h2 id="room-name">{props.room.room}</h2>
        <h3>
          <i class="fas fa-users"></i> Users
        </h3>
        <ul id="users">
          <li>{props.user.username}</li>
        </ul>
      </div>
      <div class="chat-messages"></div>
    </main>
  );
}

export default UsersAndRoom;
