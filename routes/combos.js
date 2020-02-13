const express = require('express')

const { unsupported } = require('../utils')
const Combo = require('../models/combo')
const auth = require('../autenticacao')

const comboRouter = express.Router()

comboRouter.route('/')
  .get((_, res, next) => {
    Combo.find({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(auth.verifyUser, (req, res, next) => {
    Combo.create(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })
  .put(unsupported(['GET', 'POST', 'DELETE']))
  .delete(auth.verifyUser, (_, res, next) => {
    Combo.deleteMany({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

comboRouter.route('/:comboId')
  .get((req, res, next) => {
    Combo.findById(req.params.comboId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  // .post(unsupported['GET', 'PUT', 'DELETE'])
  .put(auth.verifyUser, (req, res, next) => {
    Combo.findByIdAndUpdate(
      req.params.comboId,
      { $set: req.body },
      { new: true }).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Combo.findByIdAndRemove(req.params.comboId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

module.exports = comboRouter
