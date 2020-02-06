const express = require("express")
const Combo = require("../models/combo")
const router = express.Router()

router.route("/")
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Combo.find({})
      .exec()
      .then((combos) =>{
        res.json(combos)
      })
      .catch(next)
  })
  .post((req, res, next) => {
    Combo.create(req.body)
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  .put((req, res) => {
    res.statusCode = 403
    res.json({ error: "operação PUT não suportada em /combos" })
  })
  .delete((req, res, next) => {
    Combo.remove({})
      .exec()
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })

router.route("/:comboID")
  .get((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  .post((req, res) => {
    res.statusCode = 403
    res.json({
      error: "operação POST não suportada em /combos" + req.params.comboID
    })
  })
  .put((req, res, next) => {
    Combo.findByIdAndUpdate(
      req.params.comboID,
      { $set: req.body },
      { new: true }
    )
      .exec()
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    Combo.findByIdAndRemove(req.params.comboID)
      .exec()
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })

router.route("/:comboID/tags")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        const { tags = null } = combo || {}
        res.json({ tags })
      })
      .catch(next)
  })
  .post((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null) {
          combo.tags.push(req.body)
          return combo.save()
        } else {
          res.json({ error: "combo não encontrada" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  .put((req, res, next) => {
    const { originalUrl } = req
    res
      .status(405)
      .json({ error: `operação PUT não suportada em ${originalUrl}` })
  })
  .delete((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null) {
          for (let i = combo.tags.length - 1; i >= 0; i--) {
            combo.tags.id(combo.tags[i]._id).remove()
          }
          return combo.save()
        } else {
          res.json({ error: "combo não encontrada" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })

router.route("/:comboID/tags/:tagID")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null && combo.tags.id(req.params.tagID) != null) {
          res.json(combo.tags.id(req.params.tagID))
        } else if (combo == null) {
          res.json({ error: "combo não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .catch(next)
  })
  .post((req, res) => {
    const { originalUrl } = req
    res
      .status(405)
      .json({ error: `operação POST não suportada em ${originalUrl}` })
  })
  .put((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null && combo.tags.id(req.params.tagID) != null) {
          if (req.body.rating) {
            combo.tags.id(req.params.tagID).rating = req.body.rating
          }
          if (req.body.comment) {
            combo.tags.id(req.params.tagID).comment = req.body.comment
          }
          return combo.save()
        } else if (combo == null) {
          res.json({ error: "combo não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null && combo.tags.id(req.params.tagID) != null) {
          combo.tags.id(req.params.tagID).remove()
          return combo.save()
        } else if (combo == null) {
          res.json({ error: "combo não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })

  router.route("/:comboID/pizzas")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        const { pizzas = null } = combo || {}
        res.json({ pizzas })
      })
      .catch(next)
  })
  .post((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null) {
          combo.pizzas.push(req.body)
          return combo.save()
        } else {
          res.json({ error: "combo não encontrada" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  .put((req, res, next) => {
    const { originalUrl } = req
    res
      .status(405)
      .json({ error: `operação PUT não suportada em ${originalUrl}` })
  })
  .delete((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null) {
          for (let i = combo.pizzas.length - 1; i >= 0; i--) {
            combo.pizzas.id(combo.pizzas[i]._id).remove()
          }
          return combo.save()
        } else {
          res.json({ error: "combo não encontrada" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })

router.route("/:comboID/pizzas/:pizzaID")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null && combo.pizzas.id(req.params.pizzaID) != null) {
          res.json(combo.pizzas.id(req.params.pizzaID))
        } else if (combo == null) {
          res.json({ error: "combo não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .catch(next)
  })
  .post((req, res) => {
    const { originalUrl } = req
    res
      .status(405)
      .json({ error: `operação POST não suportada em ${originalUrl}` })
  })
  .put((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null && combo.pizzas.id(req.params.pizzaID) != null) {
          if (req.body.rating) {
            combo.pizzas.id(req.params.pizzaID).rating = req.body.rating
          }
          if (req.body.comment) {
            combo.pizzas.id(req.params.pizzaID).comment = req.body.comment
          }
          return combo.save()
        } else if (combo == null) {
          res.json({ error: "combo não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    Combo.findById(req.params.comboID)
      .exec()
      .then(combo => {
        if (combo != null && combo.pizzas.id(req.params.pizzaID) != null) {
          combo.pizzas.id(req.params.pizzaID).remove()
          return combo.save()
        } else if (combo == null) {
          res.json({ error: "combo não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .then((combo) =>{
        res.json(combo)
      })
      .catch(next)
  })
  
module.exports = router
