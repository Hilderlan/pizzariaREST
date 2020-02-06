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

const pizzaSchema = new Schema({
  name: {
    type: String,
    required: true
  }
},
{ timestamps: true }
)

const comboSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: false
    },
    tags: [tagsSchema],
    pizzas: [pizzaSchema],
    discount: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Combo = mongoose.model("Combo", comboSchema)
module.exports = Combo
