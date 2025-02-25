# Probo Trading Game

## Overview
Probo Trading Game is a live betting market web application built using **React (Frontend)** and **Node.js with Express & MongoDB (Backend)**. The game allows users to place bets on various markets with real-time odds updates using **Socket.IO**.

---

## Features
✅ **User Authentication** (Signup/Login using JWT)
✅ **Live Betting Market** with real-time odds updates
✅ **Socket.IO for WebSocket communication**
✅ **MongoDB Database for storing bets and users**
✅ **REST API for managing bets**

---

## Tech Stack
### **Frontend:**
- React.js
- React Router
- Axios
- Tailwind CSS (for styling)

### **Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO (for live updates)

---

## Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/probo-trading-game.git
cd probo-trading-game
```

### **2️⃣ Setup Backend**
```sh
cd backend
npm install
```

#### **Create a `.env` file in the `backend/` folder:**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

#### **Start the Backend Server:**
```sh
nodemon server.js
```
You should see:
```
Server running on port 5000
MongoDB Connected: <Your MongoDB Host>
```

### **3️⃣ Setup Frontend**
```sh
cd ../frontend
npm install
```

#### **Start the Frontend:**
```sh
npm start
```
Frontend will run on `http://localhost:3000`

---

## API Routes

### **Authentication Routes**
| Method | Endpoint          | Description          |
|--------|------------------|----------------------|
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | Login a user        |

### **Betting Routes**
| Method | Endpoint          | Description             |
|--------|------------------|-------------------------|
| POST   | /api/bets/place  | Place a new bet        |
| GET    | /api/bets        | Get all bets           |

---

## WebSocket Events (Socket.IO)
| Event Name   | Description                  |
|-------------|------------------------------|
| placeBet    | Sends a bet to the server    |
| updateOdds  | Receives updated odds       |

---

## Testing with Postman
1. **Start the backend server** (`nodemon server.js`)
2. **Use Postman** to test API requests:
   - `POST http://localhost:5000/api/auth/signup`
   - `POST http://localhost:5000/api/auth/login`
   - `POST http://localhost:5000/api/bets/place`
   - `GET http://localhost:5000/api/bets`

---

## Future Improvements 🚀
- Implement payment gateway integration
- Enhance UI with better animations
- Add more betting markets

---

## License
This project is **MIT Licensed**.

