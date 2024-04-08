const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("authorModel", AuthorSchema, "author");
