const UserRepo = require('@/repositories/UserRepo').UserRepo;
const data = [];

exports.UserRepoMock = class UserRepoMock extends UserRepo{
  constructor() {
    super();
  }
  
  async insertUser(user) {
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
    return data.find(
      rw => username === rw.username
    );
  }
  
  truncate() {
    data.length = 0;
  }
}
