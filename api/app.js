const express = require('express')
const helmet = require('helmet')
const consola = require('consola')
const app = express()

const config = {
  port: process.env.npm_package_config_api_port,
  host: process.env.npm_package_config_api_host
}

app.use(helmet())

app.use('/api/twitter', require('./routes/twitter'))

app.listen(config, () => {
  consola.ready({
    message: `API server listening on http://${config.host}:${config.port}`,
    badge: true
  })
})
