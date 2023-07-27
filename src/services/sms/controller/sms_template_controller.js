const { sms_template } = require('../model/sms_template')

const getAllSmsTemplates = async (req, res) => {
  try {
    const data = await sms_template.findAll()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
const getSmsTemplate = async (req, res) => {
  try {
    const data = await sms_template.findOne({ where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const createSmsTemplate = async (req, res) => {
  try {
    const data = await sms_template.create(req.body)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
const updateSmsTemplate = async (req, res) => {
  try {
    const data = await sms_template.update(req.body, { where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const deleteSmsTemplate = async (req, res) => {
  try {
    const data = await sms_template.destroy({ where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  createSmsTemplate,
  getAllSmsTemplates,
  getSmsTemplate,
  deleteSmsTemplate,
  updateSmsTemplate,
}
