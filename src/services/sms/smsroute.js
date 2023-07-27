const express = require('express')
const {
  createSmsTemplate,
  getSmsTemplate,
  getAllSmsTemplates,
  updateSmsTemplate,
  deleteSmsTemplate,
} = require('./controller/sms_template_controller')
const {
  getAllSms,
  getSms,
  createSms,
  updateSms,
  deleteSms,
} = require('./controller/sms_controller')
const { sendOtp, resendOtp, verifyOtp, sendTextMessage } = require('./controller/send_verify_otp_controller')

const smsRouter = express.Router()

smsRouter.get('/sms', getAllSms)
smsRouter.get('/sms/:id', getSms)
smsRouter.post('/sms', createSms)
smsRouter.patch('/sms/:id', updateSms)
smsRouter.delete('/sms/:id', deleteSms)

smsRouter.get('/sms_template', getAllSmsTemplates)
smsRouter.get('/sms_template/:id', getSmsTemplate)
smsRouter.post('/sms_template', createSmsTemplate)
smsRouter.patch('/sms_template/:id', updateSmsTemplate)
smsRouter.delete('/sms_template/:id', deleteSmsTemplate)

smsRouter.post('/send_otp', sendOtp)
smsRouter.post('/send_sms', sendTextMessage)
smsRouter.post('/resend_otp', resendOtp)
smsRouter.post('/verify_otp', verifyOtp)


module.exports =  smsRouter 
