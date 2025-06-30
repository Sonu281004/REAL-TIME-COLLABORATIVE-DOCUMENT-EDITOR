import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Map<roomId, Map<socketId, userName>>
const rooms = new Map();

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);
  let currentRoom = null;

  socket.on("join", ({ roomId, userName }) => {
    if (!roomId || !userName) return;

    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(socket.id);
      socket.leave(currentRoom);
      io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom).values()));
    }

    currentRoom = roomId;
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }

    rooms.get(roomId).set(socket.id, userName);

    io.to(roomId).emit("userJoined", Array.from(rooms.get(roomId).values()));
  });

  socket.on("codeChange", ({ roomId, code }) => {
    socket.to(roomId).emit("codeUpdate", code);
  });

  socket.on("languageChange", ({ roomId, language }) => {
    socket.to(roomId).emit("languageUpdate", language);
  });

  socket.on("typing", ({ roomId, userName }) => {
    socket.to(roomId).emit("userTyping", userName);
  });

  socket.on("leaveRoom", () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(socket.id);
      socket.leave(currentRoom);
      if (rooms.get(currentRoom).size === 0) {
        rooms.delete(currentRoom);
      } else {
        io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom).values()));
      }
      currentRoom = null;
    }
  });

  socket.on("disconnect", () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(socket.id);
      if (rooms.get(currentRoom).size === 0) {
        rooms.delete(currentRoom);
      } else {
        io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom).values()));
      }
    }
    console.log("❌ User disconnected:", socket.id);
  });
});

// Serve frontend build
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get(/^\/(?!socket\.io).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
