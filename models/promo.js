const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)

const promoSchema = new mongoose.Schema({
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
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
})

const Promo = mongoose.model('Promo', promoSchema)

module.exports = Promo
