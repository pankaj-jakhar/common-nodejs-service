const bodyParser = require("body-parser")
const { PORT } = require("./constants")
const express = require('express')
const { router } = require("./routes")
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router)



app.listen(PORT, error => {
  if (!error)
    // eslint-disable-next-line no-console
    console.log('Server is Successfully Running, and App is listening on port ' + PORT)
  // eslint-disable-next-line no-console
  else console.log("Error occurred, server can't start", error)
})
