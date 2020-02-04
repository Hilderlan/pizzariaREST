const express = require('express')
const router = express.Router()

router.route('/')
  .all((req, res, next) => {
    res.status(200)
    res.append('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    res.end('Exibindo combos!')
  })
  .post((req, res) => {
    const { name } = req.body
    res.end(`adicionando combo: ${name}`)
  })
  .put((req, res) => {
    res.status(405)
    res.append('Allow', ['GET', 'POST', 'DELETE'])
    res.end('operação PUT não é suportada em /combos')
  })
  .delete((req, res) => {
    res.end('deletando todos as combos!')
  })

router.route('/:comboID')
  .all((req, res, next) => {
    res.status(200)
    res.append('Content-Type', 'text/plain')
    next()
  })
  .get((req, res) => {
    const { comboID } = req.params
    res.end(`informações do combo: ${comboID}`)
  })
  .post((req, res) => {
    const { comboID } = req.params
    res.status(405)
    res.append('Allow', ['GET', 'PUT', 'DELETE'])
    res.end(`operação POST não é suportada em /combos/${comboID}`)
  })
  .put((req, res) => {
    const { comboID } = req.params
    const { name } = req.body
    res.write(`atualizando combo: ${comboID}`)
    res.write(`novo nome: ${name}`)
  })
  .delete((req, res) => {
    const { comboID } = req.params
    res.end(`deletando combo: ${comboID}`)
  })

module.exports = router