const express = require('express')

const { unsupported } = require('../utils')
const Promo = require('../models/promo')

const promoRouter = express.Router()

promoRouter.route('/')
  .get((_, res, next) => {
    Promo.find({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post((req, res, next) => {
    Promo.create(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })
  .put(unsupported['GET', 'POST', 'DELETE'])
  .delete((_, res, next) => {
    Promo.deleteMany({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

promoRouter.route('/:promoId')
  .get((req, res, next) => {
    Promo.findById(req.params.promoId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(unsupported['GET', 'PUT', 'DELETE'])
  .put((req, res, next) => {
    Promo.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .delete((req, res, next) => {
    Promo.findByIdAndRemove(req.params.promoId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

module.exports = promoRouter
