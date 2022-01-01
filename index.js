const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const path = require("path");
app.use(express.json());
const multer = require("multer");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOOSE, {
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
  })

  .then(
    () => {
      console.log("connect database success");
    },
    (err) => {
      console.log(err);
    }
  );
// image
app.use("/images", express.static(path.join(__dirname, "/images")));



app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
    // console.log(file.fieldname +" "+file.originalname+ " "+file.encoding )
  },
});



const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("uploaded_file"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  //  console.log(req.file, req.body)
  res.status(200).json("file has been upload");
});

app.listen(process.env.LOCALLHOST, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.LOCALLHOST}`
  );
});
