const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const homeRouter = require("./routes/home-router");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATlAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB database"));

app.use("/homes", homeRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
