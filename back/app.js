const multer = require("multer");
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const port = 3500;

let corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions)); // Enable CORS for all routes

// Set up storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Save files to the 'images' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // console.log("File Uploaded BackEnd");
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Define a route to handle file uploads
app.post("/upload", upload.single("image"), (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
