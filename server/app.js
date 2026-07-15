const express = require("express");
const cors = require("cors");

const installmentRoute = require("./routes/installmentRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/installments", installmentRoute);

module.exports = app;
