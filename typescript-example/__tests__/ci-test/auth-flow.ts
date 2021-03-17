import {app} from "@/app";
import * as supertest  from "supertest";

const request = supertest(app);

describe('test endpoint', () => {
  it('', (done) => {
    request.get('/')
      .expect(200)
      .end(done);
  })
  
  it('CI 로그인 시도', (done) => {
    request.post('/signin')
      .send({username: 'test', password: '1234'})
      // .set('Accept', 'application/json')
      .expect((res) => {
        res.body = {result: res.body.result}
      })
      .expect(200, {
        result: false
      }, done);
  })
})