const controlObjectSchema = require("./control-object.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    controlObjects: [controlObjectSchema],
    controlElements: {},
  },
  {
    versionKey: false,
  }
);

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
