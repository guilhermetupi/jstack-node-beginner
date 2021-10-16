const { listUsers } = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: listUsers,
  },
  {
    endpoint: '/products',
    method: 'GET',
    handler: listUsers,
  },
];
