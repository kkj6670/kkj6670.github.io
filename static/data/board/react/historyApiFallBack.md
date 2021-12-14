---
    title: react-router-dom 404 historyApiFallBack
    date: 2021-12-14 20:21
    tag: ["webpack"]
---

react-rotuer-dom 사용하여 개발시 spa이기 때문에 404에러가 난다.

webpack devserver 설정 historyApiFallback: true로 해결이 가능한데 문제는 /index.html로 fallback이 된다.

githu pages로 배포시에 https://깃허브아이디.github.io/프로젝트명 형식으로 접속이 가능하다.

개발서버에서 테스트시에 실서버와 동일하게 접속하여 처리하기위해 https://깃허브아이디.github.io/프로젝트명 형식으로 처리하기위해 아래처럼 설정을 했다.

```javascript
const URL_PATH = '/react-blog/';

module.exports = {
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: URL_PATH,
  },
  devServer: {
    historyApiFallback: true, // before https://localhost:3000/index.html로 fallback
    historyApiFallback: {
      index: `${URL_PATH}index.html`, // after https://localhost:3000/react-blog/index.html로 fallback
    },
    publicPath: URL_PATH,
  },
}
```

물론 그냥 개발서버에서는 url처리를 안하면 되긴 한다.

그런데 개발하다보니 github pages에서랑 url 환경이 달라 path문제가 몇번 생겨서 최대한 맞춰서 테스트하기위해 위 방법을 사용했다.
```javascript
const URL_PATH = '/react-blog/';

module.exports = {
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: URL_PATH,
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '',
  },
}
```