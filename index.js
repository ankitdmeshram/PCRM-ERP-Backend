const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const database = require("./config/config");

// Connecting to database
database.connect();

// Loading environment variables from .env file
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.all("*", (req, res) => {
    return res.json({
        success: true,
        message: "Good Boy! You are in the very right place.",
    });
});

// Testing the server
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

// Listening to the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});
