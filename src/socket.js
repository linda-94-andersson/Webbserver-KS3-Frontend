import { io } from "socket.io-client";

// const oldURL = "http://localhost:5000"
const newURL = "https://webbpublicering-ks1-backend.herokuapp.com/"; 

const socket = io(newURL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;