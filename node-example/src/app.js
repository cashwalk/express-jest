const express = require('express')
const sampleRouter = require('./api/router')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(sampleRouter.router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})