import { io } from "socket.io-client";

//const SOCKET_URL = "http://localhost:3000";
const SOCKET_URL = "https://project-flow-app-1.onrender.com";
const socket = io(SOCKET_URL, { autoConnect: false });

export default socket;
