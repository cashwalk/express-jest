import {User} from "@/models/users";

export const initUser = function createRandomUser(): User {
  return {
    username: randomStr(16),
    name: 'asdf',
    password: 'asdf'
  }
}

export const randomStr = function createRandomStr(len: number): string {
  const eleList = 'ABCDEFHIJKLMNOPQRSTUVXYZabcdefhijklmnopqrstuvxyz';
  let result = '';
  Array(len).fill(0).forEach((_, i) => {
    const random = Math.floor(Math.random() * 48)
    result += eleList[random];
  });
  return result;
}