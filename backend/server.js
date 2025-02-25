const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/bets", require("./routes/betRoutes"));

// WebSocket connection for live betting
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("placeBet", (data) => {
    console.log("Bet Placed:", data);
    io.emit("updateOdds", { odds: Math.random() * 2 }); // Dummy odds update
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
