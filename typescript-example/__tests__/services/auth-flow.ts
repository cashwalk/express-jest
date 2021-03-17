import UserService, {PASSWORD_LENGTH, USERNAME_LENGTH} from '@/services/UserService'
import {User} from '@/models/users';
import UserRepo from '@/repositories/UserRepo';
import UserRepoMock from "@test/repositories/UserRepoMock";

describe("사용자 인증 절차", () => {
  let userRepo: UserRepo;
  let service;
  beforeAll(()=>{
    //COMMON BUILD
    userRepo = new UserRepoMock();
    service = new UserService(userRepo)
  });
  
  beforeEach(() => {
    //COMMON BUILD
  })
  
  it('성공테스트, 사용자 회원가입', async () =>  {
    //BUILD
    const originalUser = initUser();
    
    //OPERATE
    const user = await service.createUser(originalUser);
    
    //CHECK
    expect(user.username).toBe(originalUser.username);
    expect(user.id).toBe(originalUser.id);
  });
  
  it('실패테스트, username 에 특수문자 있을 시 에러', async () => {
    //BUILD
    const specialLetterCases = ['@', '^', '!', ')', '('];
    const failTry = specialLetterCases.map( (ele) => {
      return { input: ele, output: true }
     });
  
    //OPERATE
    for(let i = 0; i < failTry.length; i++) {
      let ele = failTry[i];
      const user: User = initUser();
      user.username = user.username.substring(0, user.username.length - 1) + ele.input;
      try {
        await service.createUser(user);
      } catch (e) {
        ele.output = false;
      }
    }
    
    //CHECK
    failTry.forEach( (ele) => {
      expect(ele.output).toBe(false);
    })
  
  });
  
  it('실패테스트, username, password 길이 제한', async () => {
    const usrWithLongUsername = initUser();
    const usrWithLongPwd = initUser();
    usrWithLongUsername.username = randomStr(USERNAME_LENGTH + 1);
    usrWithLongPwd.password = randomStr(PASSWORD_LENGTH + 1);
    let failCnt = 0;
    
    try {
      await service.createUser(usrWithLongUsername);
    } catch (e) {
      failCnt += 1;
    }
    try {
      await service.createUser(usrWithLongPwd);
    } catch (e) {
      failCnt += 1;
    }
  
    expect(failCnt).toBe(2);
  });
  
  it('실패테스트, 중복 사용자', async () => {
    const user = initUser();
    const duplicatedUser = {...user};
    
    try {
      await service.createUser(user);
      await service.createUser(duplicatedUser)
    } catch (e) {
      return;
    }
    
    fail('');
  })
  
  it('성공테스트, 로그인', async () => {
    const user = initUser();
    await userRepo.insertUser(user);
    
    const isSuccess = await service.signin(user);
    
    expect(isSuccess).toBe(true);
  });
  
  it('실패테스트, 존재하지 않는 사용자', async () => {
    const user = initUser();
  
    const isSuccess = await service.signin(user);
  
    expect(isSuccess).toBe(false);
  });
  
  it('실패테스트, 잘못된 입력 정보 ', async () => {
    const user = initUser();
    await userRepo.insertUser(initUser());
    const userToLogin = {...user, password: ''}
  
    const isFail = await service.signin(userToLogin);
  
    expect(isFail).toBe(false);
  });
  
  afterEach(() => {
    //COMMON CLEANUP
  })
  
  afterAll(() => {
    //COMMON CLEANUP
    userRepo.truncate();
  })
})

const initUser = function createRandomUser(): User {
  return {
    username: randomStr(16),
    name: 'asdf',
    password: 'asdf'
  }
}

const randomStr = function createRandomStr(len: number): string {
  const eleList = 'ABCDEFHIJKLMNOPQRSTUVXYZabcdefhijklmnopqrstuvxyz';
  let result = '';
  Array(len).fill(0).forEach((_, i) => {
    const random = Math.floor(Math.random() * 48)
    result += eleList[random];
  });
  return result;
}


