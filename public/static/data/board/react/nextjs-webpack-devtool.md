---
    title: nextjs webpack devtool 설정
    date: 2021-12-07 21:25
    tag: ["nextjs", "webpack"]
---

next.config.js 에서 webpack devtool 설정을 하는도중 문제가 발생했다.

```javascript
// next.config.js
webpack: (config, { dev }) => {
  const customConfig = { ...config };

  if (dev) {
    customConfig.devtool = 'cheap-module-source-map';
  }

  return {
    ...customConfig,
  };
}
```

아래와 같이 강제로 변경되는 현상이 있었다.

![devtool warn](https://lh3.googleusercontent.com/pw/AM-JKLWvibMiKzgfUOLLhKaglem5qsv-a14K2ZG0FVVfGqWgKNnVBd5ki8tCPu3eyY3vbVtvEO2-VF7JYzV9N72n6ICMQfeVE0T84Vlqcjb6OoCuZpK6meXbB2Y--SVmnGAv_kj3ZzCeFZcQC09iRNiGLaXv=w826-h59-no?authuser=1)
문서를 확인해 보니 next.js 에서 최적의 devtool을 자동으로 선택하는거 같았고 내가 선택한 devtool은 next.js에서 사용하기엔 부적절했던거 같다.


![nextjs docs](https://lh3.googleusercontent.com/pw/AM-JKLXDyfViqOP1WRoSxD94RhVXSgzLw0_UVp5LlesLo7U2mLxixlskglikA7Dnr0rPILr-_NtiHFTIKCMJqKXO9HI8a0-ZR8-ElVaJr6m3ZVOkOnlKGV8l4Ea3P8MHau44i505mneWKp5ZlLtM1StOW9l4=w1286-h914-no?authuser=1)
([공식문서](https://nextjs.org/docs/messages/improper-devtool))
개발서버에서 devtool을 직접 사용해보고 결정하려고 했는데 next.js에서 자동으로 선택해준다니 굳이 설정할 필요가 없을꺼같아 일단은 없앴고 문서에 있는대로 production에서만 설정을 해주었다.

```javascript
// next.config.js
webpack: (config, { dev, isServer }) => {
  const customConfig = { ...config };

  if (!dev) {
    customConfig.devtool = isServer ? false : 'nosources-source-map';
  }

  return {
    ...customConfig,
  };
}
```