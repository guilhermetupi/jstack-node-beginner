const users = require('../mocs/users');

module.exports = {
  listUsers(req, res) {
    const { order } = req.query;
    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id < b.id ? -1 : 1;
      }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  },
};
