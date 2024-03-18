const express = require("express");
const router = express.Router();
const blogPostModel = require("../models/blogPost");

router.get("/", async (req, resp) => {
  try {
    const blogPost = await blogPostModel.find();
    resp.status(200).send(blogPost);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

router.get("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const blogPost = await blogPostModel.findById(id);
    if (!blogPost) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request blogPost doesn't exist",
      });
    }
    resp.status(200).send(blogPost);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

router.post("/", async (req, resp) => {
  const newBlogPost = new blogPostModel({
    category: req.body.category,
    title: req.body.title,
    cover: req.body.cover,
    readTime: req.body.readTime,
    author: req.body.author,
    content: req.body.content,
  });
  try {
    const blogPostToSave = await newBlogPost.save();
    resp.status(201).send({
      statusCode: 201,
      payload: blogPostToSave,
    });
  } catch (error) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

router.patch("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const blogPost = await blogPostModel.findById(id);
    if (!blogPost) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request blogPost doesn't exist",
      });
    }
    const updatedData = req.body;
    const options = { new: true };
    const result = await blogPostModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    resp.status(200).send(result);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

router.delete("/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const blogPost = await blogPostModel.findByIdAndDelete(id);
    if (!blogPost) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request blogPost doesn't exist",
      });
    }

    resp.status(200).send(`blogPost with id ${id} succesfully removed`);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

module.exports = router;
