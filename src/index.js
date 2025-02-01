require("dotenv").config();
const app = require("./server");
const connectDB = require('./DB/db');

// Function to start the server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit if the database connection fails
  }
};

// Start the server
startServer();
