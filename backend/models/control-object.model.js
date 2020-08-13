const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const controlObjectSchema = new Schema(
  {
    title: { type: String, required: true},
    controlElements: new Schema(
      {
        Switch: { type: Boolean, required: true },
        Power: { type: Number, required: true },
      },
      { strict: false, _id: false }
    ),
  },
  {
    versionKey: false,
    strict: false,
  }
);

module.exports = controlObjectSchema;
