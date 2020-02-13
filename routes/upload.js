const express = require("express")
const multer = require("multer")
const { verifyUser } = require("../autenticacao")

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "public/images")
  },
  filename: (req, file, done) => {
    done(null, file.originalname)
  }
})
const fileFilter = (req, file, done) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return done(new Error("Arquivo não é uma imagem"), false)
  }
  done(null, true)
}
const upload = multer({ storage, fileFilter })

const uploadRouter = express.Router()
uploadRouter
  .route("/")
  .post(upload.single("imageFile"), (req, res) => {
    res.status(200).json(req.file)
  })

module.exports = uploadRouter
