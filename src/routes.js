const express = require('express')
const smsRouter = require('./services/sms/smsroute')

const router = express.Router()

router.get('/', (_req, res) => res.status(200).send('Falcon is healthy'))

router.use(smsRouter)

router.use((req, res) => {
  res.status(404).json({
    error: 'endpoint not found',
    path: req.originalUrl,
  })
})

module.exports = { router }
