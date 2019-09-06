const express = require('express');
const actionRoutes = require('./routes/actionsRoutes')
const projectsRoutes = require('./routes/projectsRoutes')
const helmet = require('helmet');

const server = express();

server.use(helmet())
server.use(express.json())
server.use('/api/actions', actionRoutes)
server.use('/api/projects', projectsRoutes)

module.exports = server