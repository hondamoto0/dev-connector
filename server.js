const express = require("express");
const connectDB = require("./config/db");
const app = express();
const usersRoute = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const profileRoutes = require("./routes/api/profile");
const postRoutes = require("./routes/api/posts");
var cors = require("cors");
// connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false })); // same body-parser

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use(cors());
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
