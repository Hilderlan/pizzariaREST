const mongoose = require('mongoose')

const comboSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  pizzas: [mongoose.Schema.Types.ObjectId]
}, {
  timestamps: true
})

const Combo = mongoose.model('Combo', comboSchema)

module.exports = Combo
