const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = 3030;
const app = express();

const usersRoute = require("./routes/users");
app.use(express.json());
app.use("/", usersRoute);

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
