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

// ✅ Improved CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON data

// API Routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/bets", require("./routes/betRoutes"));

// ✅ Improved WebSocket Configuration (Fix CORS issues)
const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for a new bet
  socket.on("placeBet", (data) => {
    console.log("Bet Placed:", data);
    io.emit("updateOdds", { odds: Math.random() * 2 }); // Dummy odds update
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
