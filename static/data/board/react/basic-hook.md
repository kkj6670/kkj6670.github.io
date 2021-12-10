---
    title: 기본 React Hook
    date: 2021-12-07 14:00
    tag: ["hook", "기초"]
---
## useState

```javascript
// 기본 사용법
const [state, setState] = useState(initialState);

// 초기 계산이 필요할때
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

// 이전값 재사용 가능
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
```

## useEffect
주로 class 생명주기를 대체하여 사용
- prop이나 state를 반드시 요구하지 않는 함수는 컴포넌트 바깥에 선언해서 호이스팅
- 이펙트 안에서만 사용되는 함수는 이펙트 함수 내부에 선언
- 잘못된 방식으로 의존성 체크를 생략하는 것 보다 의존성을 필요로 하는 상황을 제거하는 몇 가지 전략을(주로 useReducer, useCallback) 익혀야 할 필요가 있음

```javascript
// deps update시 작동 순서
useEffect(()=>{
  // 2. somethings....
  return () => {
    // 1. clean Up
  }
},[deps]);
```

## useCallback
특정 함수를 재사용 할 때 사용
- 함수안에 state, props가 있으면 반드시 deps 배열 안에 포함
- 함수를 자식컴포넌트에 props로 넘겨줄 때는 항상 useCallback을 사용 ( 미사용시 새로운 함수를 생성한다고 받아들이고 렌더링이 계속 실행됨 )
```javascript
const testFn = useCallback(() => {
  // somethings...
}, [deps]);
```

## useMemo
특정 결과값을 재사용 할 때 사용
```javascript
const testFn = useMemo(() => {
  // somethings...
  return '';
}, [deps]);
```