
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require("express");
const app = express();
app.use(express.urlencoded)
app.use(cors({
  origin :process.env.CORS_ORIGIN,
  Credential :true
}));

// Middleware to parse incoming JSON
// app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
