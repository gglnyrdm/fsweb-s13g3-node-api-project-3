const express = require('express');
const usersRouter = require('./users/users-router');
const middleware = require('./middleware/middleware');
const server = express();
// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());
// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use(middleware.logger);

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use('/api/users', usersRouter);

module.exports = server;
