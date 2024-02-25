const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "uploads")
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "_" + Date().now + ".jpg")
        }
    })
}).single("user_file");

app.post("/upload", upload, (req, res) => {
    res.send("file upload");
});

app.listen(5500);