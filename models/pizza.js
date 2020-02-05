const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const pizzaSchema = new Schema({
    name: {
      type: String,
      require: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
)

const Pizza = mongoose.model("Pizza", pizzaSchema)
module.exports = Pizza
