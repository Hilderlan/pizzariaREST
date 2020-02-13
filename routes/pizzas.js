const express = require('express')

const { unsupported } = require('../utils')
const Pizza = require('../models/pizza')
const auth = require('../autenticacao')

const pizzaRouter = express.Router()

pizzaRouter.route('/')
  .get((_, res, next) => {
    Pizza.find({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(auth.verifyUser, (req, res, next) => {
    Pizza.create(req.body)
      .then(res.json.bind(res))
      .catch(next)
  })
  .put(unsupported(['GET', 'POST', 'DELETE']))
  .delete(auth.verifyUser, (_, res, next) => {
    Pizza.deleteMany({}).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

pizzaRouter.route('/:pizzaId')
  .get((req, res, next) => {
    Pizza.findById(req.params.pizzaId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(unsupported(['GET', 'PUT', 'DELETE']))
  .put(auth.verifyUser, (req, res, next) => {
    Pizza.findByIdAndUpdate(
      req.params.pizzaId,
      { $set: req.body },
      { new: true }).exec()
      .then(res.json.bind(res))
      .catch(next)
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Pizza.findByIdAndRemove(req.params.pizzaId).exec()
      .then(res.json.bind(res))
      .catch(next)
  })

pizzaRouter.route('/:pizzaId/comments')
  .get((req, res, next) => {
    Pizza.findById(req.params.pizzaId).exec()
      .then((pizza) => pizza ? pizza.comments : null)
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(auth.verifyUser, (req, res, next) => {
    Pizza.findById(req.params.pizzaId).exec()
      .then((pizza) => {
        if (!pizza) return null
        pizza.comments.push(req.body)
        return pizza.save()
      })
      .then(res.json.bind(res))
      .catch(next)
  })
  .put(unsupported(['GET', 'POST', 'DELETE']))
  .delete(auth.verifyUser, (req, res, next) => {
    Pizza.findById(req.params.pizzaId).exec()
      .then((pizza) => {
        if (!pizza) return null
        for (let i = pizza.comments.length - 1; i >= 0; i--) {
          pizza.comments.id(pizza.comments[i]._id).remove()
        }
        return pizza.save()
      })
      .then(res.json.bind(res))
      .catch(next)
  })

pizzaRouter.route('/:pizzaId/comments/:commentId')
  .get((req, res, next) => {
    Pizza.findById(req.params.pizzaId).exec()
      .then((pizza) => {
        if (!pizza) return null
        return pizza.comments.id(req.params.commentId)
      })
      .then(res.json.bind(res))
      .catch(next)
  })
  .post(unsupported(['GET', 'PUT', 'DELETE']))
  .put(auth.verifyUser, (req, res, next) => {
    Pizza.findById(req.params.pizzaId).exec()
      .then((pizza) => {
        if (!pizza) return null
        const comment = pizza.comments.id(req.params.commentId)
        if (!comment) return null
        comment.rating = req.body.rating || comment.rating
        comment.comment = req.body.comment || comment.comment
        return pizza.save()
      })
      .then(res.json.bind(res))
      .catch(next)
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .then((pizza) => {
        if (!pizza) return null
        const comment = pizza.comments.id(req.params.commentId)
        if (!comment) return null
        comment.remove()
        return pizza.save()
      })
      .then(res.json.bind(res))
      .catch(next)
  })

module.exports = pizzaRouter
