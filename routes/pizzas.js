const express = require("express")
const { unsupported } = require('../utils')
const Pizza = require("../models/pizza")
const auth = require('../autenticacao')

const router = express.Router()

router.route("/")
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    next()
  })
  .get(auth.verifyUser, (req, res, next) => {
    Pizza.find({})
      .exec()
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })
  .post((req, res, next) => {
    Pizza.create(req.body)
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })
  .put(unsupported(['GET', 'POST', 'DELETE']))
  .delete((_, res, next) => {
    Pizza.deleteMany({})
      .exec()
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })

router.route("/:pizzaId")
  .get((req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .exec()
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })
  .post(unsupported(['GET', 'PUT', 'DELETE']))
  .put((req, res, next) => {
    Pizza.findByIdAndUpdate(
      req.params.pizzaId,
      { $set: req.body },
      { new: true }
    )
      .exec()
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    Pizza.findByIdAndRemove(req.params.pizzaId)
      .exec()
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })

router.route("/:pizzaId/comments")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .exec()
      .then(pizza => {
        const { comments = null } = pizza || {}
        res.json({ comments })
      })
      .catch(next)
  })
  .post((req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .exec()
      .then(pizza => {
        if (pizza != null) {
          pizza.comments.push(req.body)
          return pizza.save()
        } else {
          res.json({ error: "pizza não encontrada" })
        }
      })
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })
  .post(unsupported(['GET', 'POST', 'DELETE']))
  .delete((req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .exec()
      .then(pizza => {
        if (pizza != null) {
          for (let i = pizza.comments.length - 1; i >= 0; i--) {
            pizza.comments.id(pizza.comments[i]._id).remove()
          }
          return pizza.save()
        } else {
          res.json({ error: "pizza não encontrada" })
        }
      })
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })

router.route("/:pizzaId/comments/:commentId")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .exec()
      .then(pizza => {
        if (pizza != null && pizza.comments.id(req.params.commentId) != null) {
          res.json(pizza.comments.id(req.params.commentId))
        } else if (pizza == null) {
          res.json({ error: "pizza não encontrada" })
        } else {
          res.json({ error: "commentário não encontrado" })
        }
      })
      .catch(next)
  })
  .post(unsupported(['GET', 'PUT', 'DELETE']))
  .put((req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .exec()
      .then(pizza => {
        if (pizza != null && pizza.comments.id(req.params.commentId) != null) {
          if (req.body.rating) {
            pizza.comments.id(req.params.commentId).rating = req.body.rating
          }
          if (req.body.comment) {
            pizza.comments.id(req.params.commentId).comment = req.body.comment
          }
          return pizza.save()
        } else if (pizza == null) {
          res.json({ error: "pizza não encontrada" })
        } else {
          res.json({ error: "commentário não encontrado" })
        }
      })
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    Pizza.findById(req.params.pizzaId)
      .exec()
      .then(pizza => {
        if (pizza != null && pizza.comments.id(req.params.commentId) != null) {
          pizza.comments.id(req.params.commentId).remove()
          return pizza.save()
        } else if (pizza == null) {
          res.json({ error: "pizza não encontrada" })
        } else {
          res.json({ error: "commentário não encontrado" })
        }
      })
      .then((pizza) =>{
        res.json(pizza)
      })
      .catch(next)
  })

module.exports = router
