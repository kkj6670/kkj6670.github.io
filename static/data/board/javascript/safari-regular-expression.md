---
    title: javascript ios safari new date invalid Date
    date: 2022-04-19 10:40
    tag: ["safari", "ios", "regexp"]
---
## 이슈
SyntaxError: Invalid regular expression: invalid group specifier name

회원가입 관련 개발을 하면서 정규표현식을 많이 사용하게 되었는데
크롬에서는 잘되는데 safari에서는 흰화면이 나오는 현상이 생겼다.
검색해보니 safari에서 지원을 안하는 정규표현식이 있었다.

아래와같은
```js
/(?<=\/)/
```
## 해결방안
찾아보니 아래처럼 적용이 가능했다.
이외에도 문제가 될만한 정규표현식이 있으니 사용시 에러가난다면 정규표현식을 한번 확인해보길...
```js
/(?:\/)/
```

- 스택오버플로우 ([https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group](https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group))