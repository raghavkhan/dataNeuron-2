const mongoose = require("mongoose");

const SchemaObject = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 6,
    maxLength: 50,
  },
  age: {
    type: Number,
    required: [true, "Please provide your age"],
    min: 1,
    max: 100,
  },
};
const UserSchema = new mongoose.Schema(SchemaObject);

const model = mongoose.model("User", UserSchema);
module.exports = model;
