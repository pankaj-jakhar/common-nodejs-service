const express = require('express')
const {
  getAllS3,
  getS3,
  createS3,
  updateS3,
  deleteS3,
} = require('./controller/s3_controller')

const { upload, playFile } = require('./controller/s3_upload_download_controller')

const s3Router = express.Router()

s3Router.get('/s3', getAllS3)
s3Router.get('/s3/:id', getS3)
s3Router.post('/s3', createS3)
s3Router.patch('/s3/:id', updateS3)
s3Router.delete('/s3/:id', deleteS3)

s3Router.get('/s3_upload', upload)
s3Router.get('/s3_play/:id', playFile)



module.exports =  s3Router 
