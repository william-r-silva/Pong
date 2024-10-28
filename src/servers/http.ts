import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { PORT } from "../utils/const";

const app = express();

app.use(express.static(path.join(__dirname, "../..", "public")));

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

serverHttp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { io, serverHttp } 