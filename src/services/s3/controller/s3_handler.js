const { S3_KEY, S3_SECRET, S3_REGION, S3_BUCKET } = require('../../../constants')
const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3({
  accessKeyId: S3_KEY,
  secretAccessKey: S3_SECRET,
  region: S3_REGION,
})

const uploadFile = async (buffer, key) => {
  return new Promise(resolve => {
    const params = {
      Bucket: S3_BUCKET,
      Delimiter: '/',
      Prefix: '/',
      Key: key,
      Body: buffer,
    }

    s3.upload(params, function (err, data) {
      if (err) {
        console.log('ERROR MSG: ', err)
      } else {
        console.log('Successfully uploaded data', data)
        resolve({ key })
      }
    })
  })
}

const downloadFile = async (key, filePath) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: key,
  }

  const response = await s3.getObject(params).promise()
  if (!response) {
    return null
  }
  fs.writeFileSync(filePath, response.Body)
}

module.exports = {
  uploadFile,
  downloadFile,
}
