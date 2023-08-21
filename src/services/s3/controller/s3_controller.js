const { s3 } = require('../model/s3')

const getAllS3 = async (req, res) => {
  try {
    const data = await s3.findAll()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
const getS3 = async (req, res) => {
  try {
    const data = await s3.findOne({ where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const createS3 = async (req, res) => {
  try {
    const data = await s3.create(req.body)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
const updateS3 = async (req, res) => {
  try {
    const data = await s3.update(req.body, { where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const deleteS3 = async (req, res) => {
  try {
    const data = await s3.destroy({ where: { id: req.params.id } })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  createS3,
  getAllS3,
  getS3,
  deleteS3,
  updateS3,
}
