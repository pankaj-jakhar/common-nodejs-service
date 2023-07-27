const { sms } = require('../model/sms')

const getAllSms = async (req, res) => {
  try {
    const data = await sms.findAll()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
const getSms = async (req, res) => {
  try {
    const data = await sms.findOne({ where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const createSms = async (req, res) => {
  try {
    const data = await sms.create(req.body)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
const updateSms = async (req, res) => {
  try {
    const data = await sms.update(req.body, { where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const deleteSms = async (req, res) => {
  try {
    const data = await sms.destroy({ where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  createSms,
  getAllSms,
  getSms,
  deleteSms,
  updateSms,
}
