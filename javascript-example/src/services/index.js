const UserRepo = require('../repositories/UserRepoImpl').UserRepoImpl;
const UserService = require('./UserService').UserService;

const userRepo = new UserRepo();
const userService = new UserService(userRepo);

exports.userService = userService;