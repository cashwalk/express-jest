import {app} from "@/app";
import * as supertest  from "supertest";
import UserRepoMock from "@test/__mocks__/repositories/UserRepoMock";
import {initUser} from "@test/__mocks__/userMocks";
import {userService} from "@/services";

const request = supertest(app);

describe('test endpoint', () => {
  let usrService = userService;
  let userRepo = usrService.repo;
  
  beforeAll(()=>{
    //COMMON BUILD
  });
  
  it('', (done) => {
    request.get('/')
      .expect(200)
      .end(done);
  })
  
  it('CI 실패, 로그인 시도', (done) => {
    request.post('/signin')
      .send({username: 'test', password: '1234'})
      .set('Accept', 'application/json')
      
      
      .expect((res) => {
        res.body = {result: res.body.result}
      })
      .expect(200, {
        result: false
      }, done);
  })
  
  it('CI 성공, 로그인 시도', async (done) => {
    const user = initUser();
    await userRepo.insertUser(user);
    
    
    request.post('/signin')
      .send(user)
      .set('Accept', 'application/json')
      
      
      .expect((res) => {
        res.body = {result: res.body.result}
      })
      .expect(200, {
        result: true
      }, done);
    
  })
  
  afterAll(() => {
    userRepo.truncate();
  })
})