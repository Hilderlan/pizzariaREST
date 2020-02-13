const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)

const commentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  price: {
    type: mongoose.Types.Currency,
    required: true,
    min: 0
  },
  tags: [String],
  comments: [commentSchema]
}, {
  timestamps: true
})

const Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = Pizza
