var express = require("express")
var User = require("../models/user")
const passport = require("passport")
const { getToken } = require("../autenticacao")

var router = express.Router()

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource")
})

router.post("/signup", (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      admin: true
    }),
    req.body.password,
    (err, usuario) => {
      if (err) {
        return next(err)
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send("usuário adicionado com sucesso")
        })
      }
    }
  )
})
router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = getToken({ _id: req.user._id })
  res.json({sucess: true, token, message: "logado com sucesso"})
})

module.exports = router
