const express = require('express')
const router = express.Router()

router.route('/')
  .all((req, res, next) => {
    res.status(200)
    res.append('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    res.end('Promocao para as pizzas!')
  })
  .post((req, res) => {
    const { name } = req.body
    res.end(`adicionando a promocao: ${name}`)
  })
  .put((req, res) => {
    res.status(405)
    res.append('Allow', ['GET', 'POST', 'DELETE'])
    res.end('operação PUT não é suportada em /promocoes')
  })
  .delete((req, res) => {
    res.end('deletando todas as promocoes!')
  })

router.route('/:promoID')
  .all((req, res, next) => {
    res.status(200)
    res.append('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    const { promoID } = req.params
    res.end(`informações da promocao: ${promoID}`)
  })
  .post((req, res) => {
    const { promoID } = req.params
    res.status(405)
    res.append('Allow', ['GET', 'PUT', 'DELETE'])
    res.end(`operação POST não é suportada em /promocoes/${promoID}`)
  })
  .put((req, res) => {
    const { promoID } = req.params
    const { name } = req.body
    res.write(`atualizando promocao: ${promoID}`)
    res.write(`novo nome: ${name}`)
  })
  .delete((req, res) => {
    const { promoID } = req.params
    res.end(`deletando promocao: ${promoID}`)
  })

module.exports = router