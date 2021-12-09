---
    title: 부모 컴포넌트에서 자식 컴포넌트 함수 사용하기 ( useImperativeHandle, forwardRef )
    date: 2021-12-09 13:54
    tag: ["hook"]
---
개발을 하다보니 부모컴포넌트에서 자식 컴포넌트에 있는 input에 접근하여 사용해야할 일이 생겼다.

생각해보니 그동안 개발하면서 이렇게 사용할일이 없었어가지고 어떻게 해야할지 고민하다가 google의 힘을 빌려 진행했고 정리를 안해놓으면 나중에 까먹을꺼 같아서 정리해보았다.

## 사용한 기능

기능을 구현하기 위해서는 일단 useImperativeHandle hook과 React.forwardRef 기능을 사용해야 한다. 아래의 공식문서를 참고하여 기능을 구현 했다.

공식문서 참고

- useImperativeHandle ([https://ko.reactjs.org/docs/hooks-reference.html#useimperativehandle](https://ko.reactjs.org/docs/hooks-reference.html#useimperativehandle))
- forwardRef ([https://ko.reactjs.org/docs/react-api.html#reactforwardref](https://ko.reactjs.org/docs/react-api.html#reactforwardref))

## 자식 컴포넌트 예제

```typescript
// 1. typescript 사용시 해당 ref의 type 지정
// 부모컴포넌트에서도 사용하기위해 export를 했음.
export interface ISearchHandle {
  focus: () => void;
}

// 2. 함수 생성시 forwardRef를 사용
const BoardSearch = forwardRef<ISearchHandle>((props, ref) => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchText(value);
    },
    [setSearchText],
  );
	
  // 3. 부모컴포넌트에서 사용할 함수들의 기능을 생성해줌.
  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef?.current?.focus();
      },
    }),
    [clearSearchText, inputRef],
  );

  return (
    <SearchBox>
      <input
        ref={inputRef}
        id='boardSearch'
        type='text'
        placeholder='Search...'
        onInput={handleInput}
        value={searchText}
      />
    </SearchBox>
  );
});

// 4. typescript에서 forwardRef를 사용할경우 eslint에서 에러가 생김
BoardSearch.displayName = 'BoardSearch';
```

## 부모 컴포넌트 예제

```typescript
import BoardSearch, { ISearchHandle } from '../board/BoardSearch';

const Header = function () {
  // 1. ref생성
  const handleSearchRef = useRef<ISearchHandle>(null);

  const handleSearchOpen = useCallback(() => {
    setTimeout(() => {
      // 3. 자식컴포넌트에서 전달받은 함수 사용
      handleSearchRef?.current?.focus();
    }, 0);
  }, [hideSideBar, handleSearchRef]);
  
  // 2. 자식컴포넌트에 ref전달
  return <BoardSearch ref={handleSearchRef} />;
};
```