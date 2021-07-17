if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require('node-cron');

const app = express();
const mongoose = require("mongoose");

const iap = require("./models/helpers/iap.helper")


app.use(cors());
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "wellcome to Life Journal api" });
});

require("./routes/user.routes")(app);
require("./routes/journal.routes")(app);
require("./routes/thankfulness.routes")(app);
require("./routes/teachingNotes.routes")(app);
require("./routes/bibleStudy.routes")(app);
require("./routes/todo.routes")(app);
require("./routes/dailyRoutine.routes")(app);
require("./routes/prayer.routes")(app);
require("./routes/iap.routes")(app);
require("./routes/blog.routes")(app);
require("./routes/group.routes")(app);

require("./routes/stats.routes")(app);

cron.schedule('* 12 * * *', function() {
  iap.renewOrCancelSubscriptions()
});

app.listen(process.env.PORT || 3003, () => console.log("server started"));
