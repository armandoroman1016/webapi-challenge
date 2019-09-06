const express = require('express');
const actionRoutes = require('./routes/actionsRoutes')

const server = express();

server.use(express.json())
server.use('/api/actions', actionRoutes)

module.exports = server