const { Server } = require("socket.io");
const express = require('express');
const http = require('http');
const path = require("path");
const app = express();

const server = http.createServer(app);

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://192.168.1.14:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // socket.on('join-game', (playerName) => {
    //     console.log(`${playerName} joined the game`);
    //     io.emit('player-added', playerName);
    // });

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        io.emit('player-removed', socket.id);
    });
});

server.listen(8002, () => {
    console.log('Socket.IO Game server with API is listening on port 8002');
});
