const express = require("express")

const { unsupported } = require('../utils')
const Promocao = require("../models/promocao")
const auth = require('../autenticacao')

const router = express.Router()

router.route("/")
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Promocao.find({})
      .exec()
      .then((promocoes) =>{
        res.json(promocoes)
      })
      .catch(next)
  })
  .post(auth.verifyUser, (req, res, next) => {
    Promocao.create(req.body)
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })
  .put(auth.verifyUser, (req, res) => {
    res.statusCode = 403
    res.json({ error: "operação PUT não suportada em /promocoes" })
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Promocao.remove({})
      .exec()
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })

router.route("/:promocaoID")
  .get((req, res, next) => {
    Promocao.findById(req.params.promocaoID)
      .exec()
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })
  .post(auth.verifyUser, (req, res) => {
    res.statusCode = 403
    res.json({
      error: "operação POST não suportada em /promocaos/" + req.params.promocaoID
    })
  })
  .put(auth.verifyUser, (req, res, next) => {
    Promocao.findByIdAndUpdate(
      req.params.promocaoID,
      { $set: req.body },
      { new: true }
    )
      .exec()
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Promocao.findByIdAndRemove(req.params.promocaoID)
      .exec()
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })

router.route("/:promocaoID/tags")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Promocao.findById(req.params.promocaoID)
      .exec()
      .then(promocao => {
        const { tags = null } = promocao || {}
        res.json({ tags })
      })
      .catch(next)
  })
  .post(auth.verifyUser, (req, res, next) => {
    Promocao.findById(req.params.promocaoID)
      .exec()
      .then(promocao => {
        if (promocao != null) {
          promocao.tags.push(req.body)
          return promocao.save()
        } else {
          res.json({ error: "promocao não encontrada" })
        }
      })
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })
  .put(auth.verifyUser, (req, res, next) => {
    const { originalUrl } = req
    res
      .status(405)
      .json({ error: `operação PUT não suportada em ${originalUrl}` })
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Promocao.findById(req.params.promocaoID)
      .exec()
      .then(promocao => {
        if (promocao != null) {
          for (let i = promocao.tags.length - 1; i >= 0; i--) {
            promocao.tags.id(promocao.tags[i]._id).remove()
          }
          return promocao.save()
        } else {
          res.json({ error: "promocao não encontrada" })
        }
      })
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })

router.route("/:promocaoID/tags/:tagID")
  .all((req, res, next) => {
    res.status(200).append("Content-Type", "application/json")
    next()
  })
  .get((req, res, next) => {
    Promocao.findById(req.params.promocaoID)
      .exec()
      .then(promocao => {
        if (promocao != null && promocao.tags.id(req.params.tagID) != null) {
          res.json(promocao.tags.id(req.params.tagID))
        } else if (promocao == null) {
          res.json({ error: "promocao não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .catch(next)
  })
  .post(auth.verifyUser, (req, res) => {
    const { originalUrl } = req
    res
      .status(405)
      .json({ error: `operação POST não suportada em ${originalUrl}` })
  })
  .put(auth.verifyUser, (req, res, next) => {
    Promocao.findById(req.params.promocaoID)
      .exec()
      .then(promocao => {
        if (promocao != null && promocao.tags.id(req.params.tagID) != null) {
          if (req.body.rating) {
            promocao.tags.id(req.params.tagID).rating = req.body.rating
          }
          if (req.body.comment) {
            promocao.tags.id(req.params.tagID).comment = req.body.comment
          }
          return promocao.save()
        } else if (promocao == null) {
          res.json({ error: "promocao não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })
  .delete(auth.verifyUser, (req, res, next) => {
    Promocao.findById(req.params.promocaoID)
      .exec()
      .then(promocao => {
        if (promocao != null && promocao.tags.id(req.params.tagID) != null) {
          promocao.tags.id(req.params.tagID).remove()
          return promocao.save()
        } else if (promocao == null) {
          res.json({ error: "promocao não encontrada" })
        } else {
          res.json({ error: "tag não encontrado" })
        }
      })
      .then((promocao) =>{
        res.json(promocao)
      })
      .catch(next)
  })

module.exports = router
