import {app} from "@/app"
import {app as user} from "@/services/manage_user"

test('null', () => {
  const n = null;
  console.log(123)
  expect(n).toBeNull();
});

//it() 은 test() 의 alias 로 똑같은 함수입니다.
//Test to import file by alias path
it('mount app', () => {
  console.log(app)
})

it('mount service', () => {
  console.log(user)
})
