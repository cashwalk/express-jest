import {app} from "@/app"

test('null', () => {
  const n = null;
  console.log('기본 테스트 방법');
  expect(n).toBeNull();
});

//it() 은 test() 의 alias 로 똑같은 함수입니다.
//Test to import file by alias path
it('mount app', () => {
  app;
})