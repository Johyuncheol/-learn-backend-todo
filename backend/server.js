const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// 사용자 라우터
const userRoutes = require("./routes/userRouter");
app.use("/api/users", userRoutes);

// 할 일 라우터
const todoRoutes = require("./routes/todoRouter");
app.use("/api/todos", todoRoutes);

// 할 일 라우터
const recordingsRoutes = require("./routes/recordingsRouter");
app.use("/api/recordings", recordingsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
