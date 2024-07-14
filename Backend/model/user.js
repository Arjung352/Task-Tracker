const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task", // Ensure this matches the name of your Task model
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
