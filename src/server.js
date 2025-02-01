const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Middleware for CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Middleware for cookies
app.use(cookieParser());

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/email', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
