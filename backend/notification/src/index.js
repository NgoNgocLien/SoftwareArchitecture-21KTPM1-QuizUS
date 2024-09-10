const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://192.168.2.177:8081", // Add localhost for web testing
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

io.listen(8004, () => {
  console.log('Socket.IO server is listening on port 8004');
});
