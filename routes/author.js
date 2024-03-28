const express = require("express");
const router = express.Router();
const AuthorModel = require("../models/author");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "PT043",
    //format: async (req, file) => "png",
    public_id: (req, file) => file.name,
  },
});

const upload = multer({ storage: internalStorage });

const cloudUpload = multer({ storage: cloudStorage });

router.post(
  "/getAuthor/UploadImg",
  upload.single("uploadImg"),
  async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    try {
      const imageUrl = req.file.filename;
      res.status(200).json({ img: `${url}/uploads/${imageUrl}` });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "file upload error",
      });
    }
  }
);

router.post(
  "/getAuthor/cloudUploadImg",
  cloudUpload.single("uploadImg"),
  async (req, res) => {
    try {
      res.status(200).json({ source: req.file.path });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "file upload error",
      });
    }
  }
);

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
