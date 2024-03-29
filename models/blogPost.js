const mongoose = require("mongoose");
const CommentsSchema = require("./comments");

const BlogPostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      max: 255,
    },
    title: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    comments: [CommentsSchema],
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("blogPostModel", BlogPostSchema, "BlogPost");
