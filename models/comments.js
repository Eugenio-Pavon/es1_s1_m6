const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = CommentsSchema;
