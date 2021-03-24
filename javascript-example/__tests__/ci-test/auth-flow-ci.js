const app = require("@/app").express;
const supertest = require("supertest");
const userMocker = require("@test/__mocks__/userMocks");
const initUser = userMocker.initUser;
const userService = require("@/services");

const request = supertest(app);

describe('test endpoint', () => {
  let usrService = userService.userService;
  let userRepo = usrService.repo;
  console.log(userRepo);
  
  beforeAll(()=>{
    //COMMON BUILD
  });
  
  // Callback 방식
  it('', (done) => {
    request.get('/')
      .expect(200)
      .end(done);
  })
  
  // Async 방식
  it('CI 실패, 로그인 시도', async () => {
    await request.post('/signin')
      .send({username: 'test', password: '1234'})
      .set('Accept', 'application/json')
      
      
      .expect((res) => {
        res.body = {result: res.body.result}
      })
      .expect(200, {
        result: false
      });
  })
  
  it('CI 성공, 로그인 시도', async () => {
    const user = initUser();
    await userRepo.insertUser(user);
    
    
    await request.post('/signin')
      .send(user)
      .set('Accept', 'application/json')
      
      
      .expect((res) => {
        res.body = {result: res.body.result}
      })
      .expect(200, {
        result: true
      });
    
  })
  
  afterAll(() => {
    userRepo.truncate();
  })
})