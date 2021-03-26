const UserRepoDyn = require('../repositories/dynamo-impl/UserRepoDynamo').UserRepoDynamo;
const UserRepoMySQL = require('../repositories/mysql-impl/UserRepoMySQL').UserRepoMySQL;
const UserService = require('./UserService').UserService;

const DB_TYPE = process.env.DB_TYPE || 'dynamo';

console.info(`DB type is ${process.env.DB_TYPE}`);
const userService = (function initUserService() {
  if (DB_TYPE.toLowerCase() === 'mysql') {
    return new UserService(new UserRepoMySQL());
  } else if (DB_TYPE.toLowerCase() === 'postgres') {
    return new UserService(new UserRepoDyn());
  } else {
    return new UserService(new UserRepoDyn());
  }
})();

exports.userService = userService;