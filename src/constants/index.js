const dotenv = require('dotenv')
dotenv.config()

module.exports.PORT = process.env.PORT
module.exports.POSTGRES_USER = process.env.POSTGRES_USER
module.exports.POSTGRES_PASS = process.env.POSTGRES_PASS
module.exports.POSTGRES_DATABASE = process.env.POSTGRES_DATABASE
module.exports.POSTGRES_PORT = process.env.POSTGRES_PORT
module.exports.POSTGRES_HOST = process.env.POSTGRES_HOST
module.exports.TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
module.exports.TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN

module.exports.S3_KEY = process.env.S3_KEY
module.exports.S3_SECRET = process.env.S3_SECRET
module.exports.S3_REGION = process.env.S3_REGION
module.exports.S3_BUCKET = process.env.S3_BUCKET