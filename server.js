if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "wellcome to elive api" });
});

require("./routes/provider.routes")(app);

app.listen(process.env.PORT || 3100, () => console.log("server started"));
