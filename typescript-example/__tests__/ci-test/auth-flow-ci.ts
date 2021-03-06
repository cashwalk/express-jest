import {app} from "@/app";
import * as supertest  from "supertest";
import {initUser} from "@test/__mocks__/userMocks";
import {userService} from "@/services";

const request = supertest(app);

describe('test endpoint', () => {
  let usrService = userService;
  let userRepo = usrService.repo;
  
  beforeAll(()=>{
    //COMMON BUILD
  });
  
  // Callback 방식
  it('ping root', (done) => {
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
    //FIXME: DynamoDB 실행시 jest 와 충돌되어 jest가 꺼지지 않음
    // userRepo.close();
  })
})