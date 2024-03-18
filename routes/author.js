const express = require("express");
const router = express.Router();
const AuthorModel = require("../models/author");

router.get("/getAuthor", async (req, resp) => {
  try {
    const Author = await AuthorModel.find();
    resp.status(200).send(Author);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

router.get("/getAuthor/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const Author = await AuthorModel.findById(id);
    if (!Author) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request Author doesn't exist",
      });
    }
    resp.status(200).send(Author);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

router.post("/createAuthor", async (req, resp) => {
  const newAuthor = new AuthorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    avatar: req.body.avatar,
  });
  try {
    const AuthorToSave = await newAuthor.save();
    resp.status(201).send({
      statusCode: 201,
      payload: AuthorToSave,
    });
  } catch (error) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

router.patch("/updateAuthor/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const Author = await AuthorModel.findById(id);
    if (!Author) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request Author doesn't exist",
      });
    }
    const updatedData = req.body;
    const options = { new: true };
    const result = await AuthorModel.findByIdAndUpdate(
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

router.delete("/deleteAuthor/:id", async (req, resp) => {
  const { id } = req.params;
  try {
    const Author = await AuthorModel.findByIdAndDelete(id);
    if (!Author) {
      return resp.status(404).send({
        statusCode: 404,
        message: "the request Author doesn't exist",
      });
    }

    resp.status(200).send(`Author with id ${id} succesfully removed`);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "internal server erroror",
    });
  }
});

module.exports = router;
