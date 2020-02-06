const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tagsSchema = new Schema({
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const promocaoSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: false
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      required: true
    },
    tags: [tagsSchema]
  },
  {
    timestamps: true
  }
)

const Promocao = mongoose.model("Promocao", promocaoSchema)
module.exports = Promocao
