---
    title: forwardRef 사용시 react/display-name 에러 Component definition is missing display name
    date: 2021-12-09 13:58
    tag: ["eslint", "에러"]
---

forwardRef 사용시 eslint에서 에러가 발생했다.

> error  Component definition is missing display name  react/display-name
>

찾아보니 아래와 같이 eslint 에러를 피할수 있었다.
```typescript
import React from "react";

const Search = React.forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref} type="search" />;
});
Search.displayName = "Search";

export default Search;
```

참고 사이트
- 스택오버플로우 ([https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref](https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref))
- 공식문서 ([https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md))
