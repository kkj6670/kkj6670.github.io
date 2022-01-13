---
    title: ESLint 자동화 husky, lint-staged 설정법
    date: 2022-01-13 12:05
    tag: ["husky", "자동화"]
---

## 기본설명
lint-staged
- 현재 git에 staged 되어있는 파일들을 검사하기위한 패키지
  
husky
- git hooks(commit, push)등과 같은 이벤트가 일어나기전에 원하는 스크립트를 실행하기 위한 패키지


## 세팅방법

### lint-staged
1. 설치
```shell
yarn add -D lint-staged
```
2. pacakge.json 수정
```javascript
{
  "lint-staged": {
		"src/**/*.{js,jsx,ts,tsx}": [
			"eslint --fix",
			"prettier --write"
		]
	}
}
```

3. 작동확인
git staged에 파일이 올라가있어야 해당 파일을 검사함
```shell
yarn lint-staged
```

### husky
husky 설정법은 v6부터 변경되어 해당 설정법으로 정리 하였음.
1. 설치
```shell
yarn add -D husky
```

2. 설정파일 추가
```shell
npm set-script prepare "husky install" && yarn prepare

npx husky add .husky/pre-commit "yarn lint-staged"
```
첫번째 명령어는 package.json sciprts에 prepare를 추가하는 명령어이다.
prepare는 패키지 설치시마다 실행할 스크립트를 설정하는것이고 husky install을 하면 기본적인 husky설정 파일들이 root경로에 .husky폴더에 생성된다.

두번째 명령어는 실제 git commit전에 실행될 스크립트를 작성하는 명령어이다.
.husky폴더에 들어가보면 pre-commit이라는 파일이 생성되어 있고 현재는 yarn lint-staged만 설정이 되어있지만 추가적으로 처리할 내용이 있으면 해당 파일을 수정하면 된다.