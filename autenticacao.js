const passport = require("passport")
const jwt = require("jsonwebtoken")
const LocalStrategy = require("passport-local").Strategy
const { Strategy, ExtractJwt } = require("passport-jwt")
const User = require("./models/user")

exports.getToken = function(user) {
  return jwt.sign(user, "secret", { expiresIn: 3600 })
}
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret"
}
exports.jwt = passport.use(
  new Strategy(opts, (payload, done) => {
    User.findById(payload._id, (err, usuario) => {
      if (err) return done(err, false)

      // Delimitando a apenas usuarios que sao admin terem acesso a algumas funcionalidades
      if (usuario["admin"]){
        console.log(usuario);
        
        return done(null, usuario)
      }
      done(null, false)
    })
  })
)

exports.local = passport.use(new LocalStrategy(User.authenticate()))
exports.verifyUser = passport.authenticate("jwt", { session: false })
// exports.isAdmin = passport.authenticate("jwt", { session: false })

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
