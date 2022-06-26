import React from "react";
import socket from "./socket";

function App() {
  // onsubmit="return validation()"
  function validation() {
    let room = document.getElementById("room");
    let listOptions = document.querySelectorAll("#list option");

    for (let i = 0; i < listOptions.length; i++) {
      if (listOptions[i].value === room.value) {
        alert("The room already exist");
      }
    }
    return false;
  }

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> THECHAT
        </h1>
      </header>
      <main className="join-main">
        <form>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
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
              required
            />
            <datalist id="list">
              <option value="JavaScript" />
              <option value="Python" />
              <option value="C#" />
              <option value="Ruby" />
              <option value="Java" />
            </datalist>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
