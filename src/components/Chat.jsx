import React from "react";
import socket from "../socket";
import UsersAndRoom from "./UsersAndRoom";

function Chat(props) {
  return (
    <div class="chat-container">
      <header class="chat-header">
        <h1>
          <i class="fas fa-smile"></i> THECHAT
        </h1>
        <a class="btn">
          Leave Room
        </a>
      </header>
      <UsersAndRoom />
      <div class="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autocomplete="off"
          />
          <button class="btn">
            <i class="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
