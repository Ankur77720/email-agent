import app from "./src/app.js";
import config from "./src/config/config.js"
import connectToDb from "./src/db/db.js";
import http from "http";
import { getResponse } from "./src/mcp/client.mcp.js";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST" ]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on('message', async (message) => {
        console.log("Message received: ", message);

        const aiResponse = await getResponse(message);

        socket.emit('message', {
            role: "assistant",
            content: aiResponse
        })


    })
});

connectToDb();

server.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
})