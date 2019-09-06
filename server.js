const express = require('express');
const actionRoutes = require('./routes/actionsRoutes')
const projectsRoutes = require('./routes/projectsRoutes')

const server = express();

server.use(express.json())
server.use('/api/actions', actionRoutes)
server.use('/api/projects', projectsRoutes)

module.exports = server