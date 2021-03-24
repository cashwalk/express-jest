
const initUser = function createRandomUser() {
  return {
    username: randomStr(16),
    name: 'asdf',
    password: 'asdf'
  }
}

const randomStr = function createRandomStr(len) {
  const eleList = 'ABCDEFHIJKLMNOPQRSTUVXYZabcdefhijklmnopqrstuvxyz';
  let result = '';
  Array(len).fill(0).forEach((_, i) => {
    const random = Math.floor(Math.random() * 48)
    result += eleList[random];
  });
  return result;
}

module.exports = {
  initUser,
  randomStr
}