var express = require("express")
var User = require("../models/user")
const passport = require("passport")
const { getToken } = require("../autenticacao")
const auth = require('../autenticacao')

var router = express.Router()

/* GET users listing. */
router.get("/", auth.verifyUser, (_, res, next) => {
  User.find({}).exec()
    .then(res.json.bind(res))
    .catch(next)
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
          console.log(usuario);
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

router.delete("/delete", passport.authenticate("local"), (req, res, next) => {
  User.deleteMany({}).exec()
    .then(res.json.bind(res))
    .catch(next)
})

module.exports = router
