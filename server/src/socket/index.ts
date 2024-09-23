import { Server } from "socket.io";

let io: Server; // Biến để lưu trữ đối tượng io
const listUser = new Map();
const listAdmin = new Map();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL!, "http://127.0.0.1:5500"],
    },
  }); // Khởi tạo đối tượng io với server
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    const role = socket.handshake.query.role;

    if (role === "admin") {
      listAdmin.set(userId, socket.id);
      listUser.set(userId, socket.id);
    } else {
      listUser.set(userId, socket.id);
    }
    
    socket.emit("returnSocket", socket.id);
  });
  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const getSocket = (userId: string) => {
  if (!userId) return null;
  const socket = listUser.get(userId);
  return socket;
};

export const getFullSocket = () => {
  const valuesIterator = listUser.values();
  // Chuyển đổi từ Iterator sang mảng
  const valuesArray = Array.from(valuesIterator);
  return [...valuesArray];
};
