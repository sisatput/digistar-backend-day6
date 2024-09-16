const express = require("express"); // Import Express framework
const bodyParser = require("body-parser"); // Import body-parser to parse JSON bodies
const router = require("./routers/Routers"); // Import user routes
const connectDB = require("./database/connection"); // Import MongoDB connection setup
const { port } = require("./config/config"); // Import configuration settings (like port)

// Create an Express app instance
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Default route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Users API!");
});

// Use the router for all routes starting with /test
app.use("/app", router);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
