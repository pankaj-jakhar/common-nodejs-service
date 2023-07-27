const { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } = require('../../../constants')
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
const sendSMS = async (phone, message) => {
  return await client.messages.create({
    body: message,
    from: '+17152602581',
    to: `+91${phone}`,
  })
}
module.exports = sendSMS
