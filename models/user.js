const mongoose = require("mongoose")
const passport = require("passport-local-mongoose")

const usuarioSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false
  }
})
usuarioSchema.plugin(passport)
module.exports = mongoose.model("User", usuarioSchema)
