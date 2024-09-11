const { Server } = require("socket.io");
const express = require('express');
const http = require('http');
const app = express();

// Create HTTP server and bind socket.io to it
const server = http.createServer(app);

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://10.0.1.35:3000",
        methods: ["GET", "POST"],
    },
});

let onlineUsers = [];

// Thêm người dùng mới vào danh sách
const addNewUser = (id_player, socketId) => {
    if (!onlineUsers.some((user) => user.id_player === id_player)) {
        onlineUsers.push({ id_player, socketId });
    }
};

// Xóa người dùng khỏi danh sách khi ngắt kết nối
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// Lấy thông tin người dùng theo id_player
const getUser = (id_player) => {
    return onlineUsers.find((user) => user.id_player === id_player);
};

io.on("connection", (socket) => {
    console.log('A user connected:', socket.id);

    // Lắng nghe khi người dùng mới kết nối
    socket.on("newUser", (id_player) => {
        addNewUser(id_player, socket.id);
        console.log('New user added:', { id_player, socketId: socket.id });
        console.log('Current online users:', onlineUsers);
    });

    // Lắng nghe khi người dùng ngắt kết nối
    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log('User disconnected:', socket.id);
        console.log('Remaining online users:', onlineUsers);
    });
});

app.post('/emit-notification', (req, res) => {
    const { noti } = req.body;
    console.log(noti)
    const user = getUser(noti.id_receiver);
    if (user) {
        io.to(user.socketId).emit('notification', { noti });
        res.status(200).json({ message: 'Notification sent successfully', noti });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

server.listen(8004, () => {
    console.log('Socket.IO server with API is listening on port 8004');
});
