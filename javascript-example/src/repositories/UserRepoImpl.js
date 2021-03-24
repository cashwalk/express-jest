const UserRepo = require('./UserRepo').UserRepo;
const data = [];

exports.UserRepoImpl = class UserRepoImpl extends UserRepo{
  constructor() {
    super();
  }
  
  async insertUser(user) {
    console.warn('Mocking class has to be implemendted with real DB');
    const isExist = data.find(rw => {
      return user.username === rw.username
    });
    if(!isExist) {
      user.id = String(data.length + 1);
      data.push(user);
    } else {
      throw new Error('Duplicate username');
    }
    
    return data.find(
      rw => user.username === rw.username
    );
  }
  
  async findUserByUsername(username) {
    console.warn('Mocking class has to be implemendted with real DB');
    return data.find(
      rw => username === rw.username
    );
  }
  
  truncate() {
    console.warn('Mocking class has to be implemendted with real DB');
    data.length = 0;
  }
  
}