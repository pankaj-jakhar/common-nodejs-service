const request = require('request').defaults({ encoding: null })
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const { uploadFile, downloadFile } = require('./s3_handler')
const { s3 } = require('../model/s3')
var crypto = require('crypto')

const getFileBuffer = filePath => {
  return new Promise((resolve, reject) => {
    request.get(filePath, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
      }
      reject('error')
    })
  })
}

const removeFolder = filePath => {
  return new Promise(resolve => {
    fs.rm(filePath, { recursive: true }, err => {
      if (err) throw err
      resolve(true)
    })
  })
}
const writeFile = (filePath, fileName, data) => {
  return new Promise(resolve => {
    fs.mkdir(filePath, { recursive: true }, err => {
      if (err) throw err
      fs.writeFile(`${filePath}/${fileName}`, data, err => {
        if (!err) resolve(true)
      })
    })
  })
}

const readFile = (filePath, fileName) => {
  return new Promise(resolve => {
    fs.readFile(`${filePath}/${fileName}`, (err, data) => {
      if (!err) resolve(data)
    })
  })
}

const zipFile = (newPath, fileName, password) => {
  return new Promise((resolve, reject) => {
    console.log('🚀 ~ file: s3_upload_download_controller.js:51 ~ zipFile ~ password:', password)
    const zip = spawn(
      'zip',
      ['-j', '-P', `${password}`, `${newPath}/${fileName}`, `${newPath}/*`],
      {
        shell: true,
      },
    )
    zip.on('close', code => {
      if (code === 0) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

const unZipFile = (newPath, fileName, password) => {
  return new Promise((resolve, reject) => {
    const unzip = spawn(
      'unzip',
      ['-o', '-P', `${password}`, `${newPath}/${fileName}`, '-d', newPath],
      {
        shell: true,
      },
    )

    unzip.on('exit', function (code) {
      if (code === 0) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

const upload = async (req, res) => {
  try {
    const password = crypto.randomBytes(20).toString('hex')
    const filePath =
      'https://file-examples.com/storage/fe3b4f721f64dfeffa49f02/2017/11/file_example_MP3_5MG.mp3'
    const fileName = filePath.split('/')[filePath.split('/').length - 1]
    const file = await getFileBuffer(filePath)
    const randomValue = new Date().getTime()
    const newPath = path.resolve(__dirname, `../doNotTrace/${randomValue}`)
    await writeFile(newPath, fileName, file)
    const zipFileName = `${fileName.split('.')[0]}.zip`
    await zipFile(newPath, zipFileName, password)
    const zipFileBuffer = await readFile(newPath, zipFileName)
    const s3Key = `doNotTrace/${new Date().getTime()}/${zipFileName}`
    await uploadFile(zipFileBuffer, s3Key)
    await removeFolder(newPath)
    const data = await s3.create({
      name: zipFileName,
      key: s3Key,
      password,
      status: 1,
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}

const playFile = async (req, res) => {
  try {
    const randomValue = new Date().getTime()
    const filePath = path.resolve(__dirname, `../doNotTrace/${randomValue}`)
    const rawData = await s3.findOne({ where: { id: req.params.id } })
    const data = rawData?.toJSON()
    if (!data) {
      res.send({ error: 'error' })
    }
    const zipFileName = data.name
    const fileName =  `${zipFileName.split('.')[0]}.mp3`
    await writeFile(filePath, zipFileName, '')
    await downloadFile(data.key,`${filePath}/${zipFileName}`)
    await unZipFile(filePath, zipFileName,data.password)
    const file = await readFile(filePath, fileName)
    await removeFolder(filePath)
    res.send(file)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  upload,
  playFile,
}
