const UserRepo = require('../repositories/dynamo-impl/UserRepoDynamo').UserRepoDynamo;
const UserService = require('./UserService').UserService;

const userRepo = new UserRepo();
const userService = new UserService(userRepo);

exports.userService = userService;