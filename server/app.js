require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => res.send("Server up and running!"));

app.listen(PORT, () => console.log("server now running"));
