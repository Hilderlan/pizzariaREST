const express = require('express')
const router = express.Router()

router.route('/')
  .all((req, res, next) => {
    res.status(200)
    res.append('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    res.end('enviando todas as pizzas!')
  })
  .post((req, res) => {
    const { name, description } = req.body
    res.end(`adicionando a pizza: ${name}, ${description}`)
  })
  .put((req, res) => {
    res.status(405)
    res.append('Allow', ['GET', 'POST', 'DELETE'])
    res.end('operação PUT não é suportada em /pizzas')
  })
  .delete((req, res) => {
    res.end('deletando todas as pizzas!')
  })

router.route('/:pizzaId')
  .all((req, res, next) => {
    res.status(200)
    res.append('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    const { pizzaId } = req.params
    res.end(`informações da pizza: ${pizzaId}`)
  })
  .post((req, res) => {
    const { pizzaId } = req.params
    res.status(405)
    res.append('Allow', ['GET', 'PUT', 'DELETE'])
    res.end(`operação POST não é suportada em /pizzas/${pizzaId}`)
  })
  .put((req, res) => {
    const { pizzaId } = req.params
    const { name, description } = req.body
    res.write(`atualizando pizza: ${pizzaId}`)
    res.write(`novo nome: ${name}`)
    res.end(`nova descrição: ${description}`)
  })
  .delete((req, res) => {
    const { pizzaId } = req.params
    res.end(`deletando pizza: ${pizzaId}`)
  })

module.exports = router