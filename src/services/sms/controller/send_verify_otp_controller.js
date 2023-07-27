const { sms } = require('../model/sms')
const { sms_template } = require('../model/sms_template')
const sendSMS = require('../provider')

const getRandomPin = (len, chars = '0123456789') =>
  [...Array(len)].map(() => chars[Math.floor(Math.random() * chars.length)]).join('')

const sendTextMessage = async (req, res) => {
  try {
    let { phone, template_id, message, values } = req.body || {}
    if (!phone) throw new Error('Phone is missing')
    if (template_id) {
      const templateData = await sms_template.findOne({ where: { id: template_id } })
      if (templateData) {
        message = templateData?.toJSON()?.message || message
        if(values){
          Object.keys(values).forEach((key)=>{
            message = message.replace(`{{${key}}}`,values[key])
          })
        }
      }
      if (!templateData) {
        template_id = null
      }
    }
    const provider_response = await sendSMS(phone, message)
    let data = {
      phone: phone,
      type: 1,
      status: 1,
      message: message,
      template_id: template_id,
      provider_response: JSON.stringify(provider_response),
      expires: 0,
    }
    const response = await sms.create(data)
    res.status(200).json({ status: 200, data: { id: response?.toJSON()?.id } })
  } catch (err) {
    res.status(500).send(err)
  }
}

const sendOtp = async (req, res) => {
  try {
    let { phone, template_id } = req.body || {}
    if (!phone) throw new Error('Phone is missing')
    let otp = getRandomPin(6)
    let message = 'Hi there this is {{otp}}'
    if (template_id) {
      const templateData = await sms_template.findOne({ where: { id: template_id } })
      if (templateData) {
        message = templateData?.toJSON()?.message || message
      }
      if (!templateData) {
        template_id = null
      }
    }
    message = message.replace(/{{otp}}/, otp)
    const provider_response = await sendSMS(phone, message)
    let data = {
      phone: phone,
      otp: otp,
      type: 0,
      status: 0,
      message: message,
      template_id: template_id,
      provider_response: JSON.stringify(provider_response),
      expires: 5 * 60,
    }
    const response = await sms.create(data)
    res.status(200).json({ status: 200, data: { id: response?.toJSON()?.id } })
  } catch (err) {
    res.status(500).send(err)
  }
}

const resendOtp = async (req, res) => {
  try {
    let { phone } = req.body || {}
    if (!phone) throw new Error('Phone is missing')
    const response = await sms.findOne({ where: { phone, type: 0 }, order: [['createdAt', 'desc']] })
    if (response) {
      const otpData = response.toJSON()
      if (otpData.status === 0) {
        let date = new Date(otpData.createdAt)
        if (date.getTime() + otpData.expires * 1000 > new Date().getTime()) {
          sendSMS(phone, otpData.message)
          res.status(200).json({ status: 200, data: { id: otpData?.id } })
        }else{
          await sms.update({ status: 2 }, { where: { id: otpData.id } })
          sendOtp(req,res)
        }
      } else if (otpData.status !== 0) {
        sendOtp(req, res)
      }
    } else {
      sendOtp(req, res)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const verifyOtp = async (req, res) => {
  try {
    let { phone, otp } = req.body || {}
    if (!phone) throw new Error('Phone is missing')
    const response = await sms.findOne({ where: { phone, type: 0 }, order: [['createdAt', 'desc']] })
    if (response) {
      const otpData = response.toJSON()
      if (otpData.status === 0) {
        let date = new Date(otpData.createdAt)
        if (date.getTime() + otpData.expires * 1000 > new Date().getTime()) {
          if (otpData.otp == otp) {
            await sms.update({ status: 1 }, { where: { id: otpData.id } })
            res.status(200).json({ status: 200, message: 'verified' })
          } else {
            res.status(200).json({ status: 200, message: 'otp_not_verified' })
          }
        } else {
          await sms.update({ status: 2 }, { where: { id: otpData.id } })
          res.status(200).json({ status: 200, message: 'expired' })
        }
      } else if (otpData.status === 1) {
        res.status(200).json({ status: 200, message: 'already_verified' })
      } else if (otpData.status === 2) {
        res.status(200).json({ status: 200, message: 'expired' })
      }
    } else {
      sendOtp(req, res)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = {
  sendOtp,
  resendOtp,
  verifyOtp,
  sendTextMessage,
}
