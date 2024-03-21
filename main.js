const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const PORT = 3030;
const app = express();

const AuthorRoute = require("./routes/author");
const blogPostRoute = require("./routes/blogPost");
const exerciseRoute = require("./routes/exercise");

app.use(cors());
app.use(express.json());
app.use("/", AuthorRoute);
app.use("/blogPosts", blogPostRoute);
app.use("/exercise", exerciseRoute);

mongoose.connect(
  "mongodb+srv://eugeniopavon:CQkPB2EsYATVvV4f@epicodedbb.xv0gvnq.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "errore di connessiones"));
db.once("open", () => {
  console.log("connesso");
});

app.listen(PORT, () =>
  console.log(`Server connected and listening on port ${PORT}`)
);
