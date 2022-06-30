import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomState, roomsState } from "../atoms/atom";
import socket from "../socket";

function Joinroom(props) {
  const [room, setRoom] = useRecoilState(roomState);
  const [rooms, setRooms] = useRecoilState(roomsState);

  useEffect(() => {
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("username", (user) => {
      if (user !== "error") {
        props.setUsername(user);
      } else {
        alert("User already exists! Pick a new name!");
        socket.emit("deleteUser", user);
        props.setShowChat(false);
        return;
      }
    });

    socket.on("joinedRoom", (data) => {
      setRoom(data);
    });

    socket.on("users", (allusers) => {
      props.setUsers(allusers);
    });

    socket.emit("getAllRooms", () => {});
  }, []);

  function handelJoinRoom() {
    socket.emit("createUser", props.username);
    socket.emit("joinRoom", { room: room, username: props.username });
    console.log(`Joined ${room}`);
    props.setShowChat(true);
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
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="room">Join room</label>
        <select id="list" onClick={(e) => setRoom(e.target.value)}>
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
