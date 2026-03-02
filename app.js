const express = require("express");
const dotenv = require("dotenv");
const cookie = require("cookie-parser")
dotenv.config();

require("./db/index.js"); // just import to initialize DB

const authRoutes = require("./routes/authroutes.js");

const app = express();

app.use(express.json());
app.use(cookie());
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log(" server running on port 3000");
});