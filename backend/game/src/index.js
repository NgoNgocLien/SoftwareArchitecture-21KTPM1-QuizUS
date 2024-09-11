const { Server } = require("socket.io");
const express = require('express');
const http = require('http');
const path = require("path");
const app = express();

const server = http.createServer(app);

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://10.126.0.158:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on('player-details', (playerName, id_player) => {
        players[socket.id] = { id: id_player, name: playerName };
        console.log(`${playerName} connected`);

        // Emit 'player-added' event to all clients
        io.emit('player-added', { id: id_player, name: playerName });
    });

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        io.emit('player-removed', socket.id);
    });
});

server.listen(8002, () => {
    // console.log('Socket.IO Game server with API is listening on port 8005');
    console.log('Socket.IO Game server with API is listening on port 8002');
});
