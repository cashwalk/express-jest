# express-jest

## 깨끗한 테스트 코드 유지의 중요성
* **테스트 코드는 실제 코드 못지 않게 중요하다.**
* 테스트 코드에 실제 코드와 동일한 품질 기준을 적용해야 한다.  
* 실제 코드가 진화하면 테스트 코드도 변해야 한다.

## 깨끗한 테스트 코드 작성하기
* 깨끗한 테스트 코드를 만들려면? 세 가지가 필요하다. **가독성, 가독성, 가독성.**  
  * 어쩌면 가독성은 실제 코드보다 테스트 코드에 더더욱 중요하다.
* **이중 표준**
  * 실제 코드만큼 효율적일 필요는 없다.
* 가독성을 위해 BUILD-OPERATE-CHECK 패턴이 자주 사용된다.
  * [DB 사용을 위한 BOC 패턴을 위한 참조 링크](https://medium.com/swlh/usual-production-patterns-applied-to-integration-tests-50a941f0b04a)
```javascript
//BUILD  테스트를 위한 사전 준비를 한다.
const userToInsert = prepareUser();

//OPERATE 테스트할 코드를 실행한다.
const userFromDB = await service.createUser(userToInsert);

//CHECK 실행 결과를 확인한다.
expect(userFromDB.username).toBe(userToInsert.username);
expect(userFromDB.id).toBe(userToInsert.id);

```

## 테스트의 최종 목적지! TDD 그리고 BDD (테스트주도 개발, 행위주도 개발)
### TDD 법칙 from [테스트 주도 개발], [클린코드]
1. 어떤 코드건 작성하기 전에 실패하는 자동화된 테스트를 작성하라.
    1. 실패하는 단위 테스트를 작성할 때까지 실제 코드를 작성하지 않는다.
    2. 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성한다.
    3. 현재 실패하는 테스트를 통과할 정도로만 실제 코드를 작성한다.
2. 중복을 제거하라.
### BDD, TDD 의 연장선으로서
개발자, QA 와 비개발자 모두 한 팀으로 대화를 통해 구체적인 예시와 어떻게 어플리케이션이 작동해야 하는지 만들어가는 방법론입니다.  
BDD 는 모든 단위 테스트들이 실사용자의 행동(유스케이스)에 의해 정의되는 것을 말합니다.  
##### 예시
> Not BDD
> 1. DB 에 저장되어 있는 사용자 정보를 가져오면 여러 API 에서 사용할거라 가정
> 2. 여러 API 에서 사용할 수 있도록 DB 에서 정보를 가져오는 서비스를 생성
> 3. 서비스를 테스트하는 테스트를 만듬
> 
> BDD
> 1. 사용자 로그인 기능이 필요
> 2. 사용자가 할 수 있는 로그인 시도 케이스들을 테스트 코드로 작성  
> ... 위에 적힌 TDD 에 맞게 실행함

----  
  
  
    
# 샘플코드 안내  

샘플코드는 javascript 와 typescript 두 가지로 나뉘어 제공됩니다.  
공통되는 부분만 안내합니다. 추가적인 부분은 각 폴더의 README.md 참조 바랍니다. 

## 단위 테스트는 [jest](https://jestjs.io/docs/getting-started) 를 사용함 
```bash
# 전체 테스트 실행  
$ jest  
# 원하는 테스트만 실행. <describeString> 는 테스트 그룹, <itString> 는 테스트 이름으로 대체합니다.  
$ jest -t '<describeString> <itString>'  
```

## endpoint 테스트에 [supertest](https://github.com/visionmedia/supertest#readme) 를 사용함  
```javascript
/** 
 * 반드시 done 함수를 파라미터로 주거나 async 함수를 사용해아 합니다.
 * 그렇지 않을 경우 테스트가 프로세스가 멈추지 않습니다.
*/ 

// callback
it('', (done) => {
request.get('/')
        .expect(200)
        .end(done);
})

// OR aync
it('', async () => {
  await request.get('/')
          .expect(200)
          .end();
})
```

## CI, CD 환경
실서버와 같은 DB 를 새로 구성해 테스트 합니다.   
그러므로 로컬에서도 Mocker 보다 실제 DB 를 사용한 테스트를 권장합니다.  

`[GIT_ROOT]/.github/workflows/` 경로에 스크립트가 있어야 합니다.  
해당 샘플의 경우 한 저장소에 두 프로젝트가 있지만 일반적인 경우 프로젝트 루트에 .github 폴더가 위치해야 합니다.  
javascript, typescript 를 위한 스크립트 동일하게 제작됐습니다.  

CI/CD 는 docker 기반으로 사용되기 때문에 사용되는 이미지 별로 환경변수와 명령어들을 위해 docker hub 에서 문서를 참조하는 것이 좋습니다.  
해당 스크립트에선 [node](https://hub.docker.com/_/node), [mysql](https://hub.docker.com/_/mysql), [postgres](https://hub.docker.com/_/postgres), [dynamodb](https://hub.docker.com/r/amazon/dynamodb-local/), [redis](https://hub.docker.com/_/redis) 이미지가 사용됐습니다.  

----
##### 참고문헌
[클린코드] Robert C. Martin  
[테스트 주도 개발] Kent Beck
