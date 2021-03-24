const USERNAME_LENGTH = 16;
const PASSWORD_LENGTH = 30;

exports.UserService = class UserService {
  
  constructor(repo) {
    this.repo = repo;
  }
  
  createUser = async (user) => {
    this.validateUsername(user.username);
    this.validatePassword(user.password);
    return await this.repo.insertUser(user);
  }
  signin = async function basicSignin(user) {
    const foundUser = await this.repo.findUserByUsername(user.username);
    return Boolean(foundUser) && foundUser.password === user.password;
  }
  
  validateUsername = function validateUsrnm(username) {
    this.isHavingSpecialChar(username);
    this.isNotTooLong(username, USERNAME_LENGTH);
  }
  
  validatePassword(password) {
    this.isNotTooLong(password, PASSWORD_LENGTH);
  }
  
  isHavingSpecialChar(str) {
    if (str.match(RegExp(/^[A-Z]+$/))) { //
      throw Error('Upper case is not allowed');
    } else if (!str.match(RegExp(/^[A-Za-z0-9]+$/))) { //
      throw Error('Username has special characters');
    }
  }
  
  isNotTooLong(str, limit) {
    if (str.length > limit) {
      throw Error('Too Long String')
    }
  }
  
  getRepo() {
    return this.repo;
  }
};

exports.USERNAME_LENGTH = USERNAME_LENGTH;
exports.PASSWORD_LENGTH = PASSWORD_LENGTH;
