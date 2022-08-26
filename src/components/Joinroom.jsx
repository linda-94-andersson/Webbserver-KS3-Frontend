import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  roomState,
  roomsState,
  usersState,
  showChatState,
  usernameState,
} from "../atoms/atom";
import socket from "../socket";

function Joinroom() {
  const [room, setRoom] = useRecoilState(roomState);
  const [rooms, setRooms] = useRecoilState(roomsState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [showChat, setShowChat] = useRecoilState(showChatState);
  const [users, setUsers] = useRecoilState(usersState);

  useEffect(() => {
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("username", (user) => {
      if (user !== "error") {
        setUsername(user);
        setShowChat(true);
      } else {
        alert("User already exists! Pick a new name!");
        socket.emit("deleteUser", user);
        setShowChat(false);
        return;
      }
    });

    socket.on("joinedRoom", (data) => {
      setRoom(data);
    });

    socket.on("users", (allusers) => {
      setUsers(allusers);
    });

    socket.emit("getAllRooms", () => {});

    setUsername("");
  }, []);

  function handelJoinRoom() {
    socket.emit("createUser", username);
    socket.emit("joinRoom", { room: room, username: username });
    socket.emit("chatMessage", {
      message: `Welcome ${username} to THECHAT!`,
      roomName: room,
      username: "Admin",
    });
    console.log(`Joined ${room}`);
  }

  const renderRooms = () => {
    if (!rooms) return <option>Loading rooms...</option>;
    return rooms.map((rooms) => {
      const { id, room } = rooms;
      return (
        <option key={id} value={room}>
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="room">Join room</label>
        <select id="list" onClick={(e) => setRoom(e.target.value)}>
          <option value="Please select a room in the list below">Select a room:</option>
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
