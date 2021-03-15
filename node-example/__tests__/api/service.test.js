const service = require('@/api/service')

describe("회원 가입 테스트", () => {
  beforeEach(() => {
    // called before every tests / initialize here
  })

  afterEach(() => {
    // called after every tests / deinitialize here
  })

  test("회원은 이름과 나이가 반드시 포함되어야 한다.", () => {
    expect(() => {
      service.checkAndAddUser({ name: '테스터', age: 1 })
    })
  })

  test("회원 이름은 3 ~ 5자리로 입력 되어야 한다.", () => {
    expect(() => {
      service.checkAndAddUser({ name: "테스", age: 1 })
    }).toThrowError()
    expect(() => {
      service.checkAndAddUser({ name: "테스터입니다", age: 1 })
    }).toThrowError()
  })

  test("회원 나이는 1 이하일 수 없다.", () => {
    expect(() => {
      service.checkAndAddUser({ name: "테스터", age: 0 })
    }).toThrowError()
  })

  test("회원 가입이 완료되면 회원아이디가 반환된다.", () => {
    expect(service.checkAndAddUser({ name: "테스터", age: 1 })).not.toBeNaN()
  })
})
