const express = require('express')
const app = express()
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_API_TOKEN,
    environment: 'stage',
    reportLevel: 'warning',
});

const port = 3000

app.get('/', (req, res) => {
    throw new Error("This is an error")
})

app.use(rollbar.errorHandler());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})