---
    title: redux 기초정리
    date: 2021-12-21 13:55
    tag: ["redux", "기초"]
---

공식문서 : (https://ko.redux.js.org/introduction/getting-started)

## 용도
- 어떤 컴포넌트에서든(전역적으로) 사용하고싶은 state가 있다면 Redux(리덕스)라는 state 관리 라이브러리를 사용.

**ex01. 로그인 정보 유지**

**ex02. 팝업창 띄우기**

## 기초

- **Action(액션)**: 상태에 어떤 변화를 일으킴

- **Dispatch(디스패치)**: 액션을 발생 시킴, 스토어에 반환

- **Reducer(리듀서)**: 현재의 상태와, 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환

- **Store(스토어)**: 현재의 앱 상태와, 리듀서를 담고 있고, 추가적으로 상태관리를 돕는 내장 함수들이 내재되어있음

=> **디스패치**로 **액션**을 일으키면 **리듀서**가 전달 받은 후 새로운 상태를 만들어내어 **스토어**에 저장되어있는 상태값을 업데이트

- **Subscribe(구독**): subscribe 함수는, 함수 형태의 값을 파라미터로 받아옵니다. subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출됩니다.

   

![redux basic](https://lh3.googleusercontent.com/pw/AM-JKLWp98KtJ2-TyAVGYRjZ-UEVcHL72w9y8k5LkywYSk8Sbw9BaiP27rpR8toioOB5bj0y9-wsDgLkoyy9pb-KcUt1O9RQJgcGwcYSR5HxbGV7QeoWtsKjzI_WOdVyVxnX9fyQBpbRIMMplnjQQcHsl1tY=w333-h293-no?authuser=1)

1. action 발생
2. action 함수실행
3. action 객체 반환
4. dispatch()
5. reducer()
6. state 업데이트
7. 화면 re-render

## Ducks 구조

- Ducks 구조에는 Reducer 파일 안에 액션타입과 액션생성자 함수를 함께 넣어서 관리하고 이를 ‘모듈’ 이라고 부릅니다.

```javascript
// widgets.js

// Actions
const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

export function createWidget(widget) {
  return { type: CREATE, widget };
}

export function updateWidget(widget) {
  return { type: UPDATE, widget };
}

export function removeWidget(widget) {
  return { type: REMOVE, widget };
}
```

## createAction 을 통한 액션생성 자동화

```javascript
export const increment = createAction(types.INCREMENT);
export const decrement = createAction(types.DECREMENT);

increment(3)
{
    type: 'INCREMENT',
    payload: 3
}

보통 파라미터로 전달받은 값을 액션의 payload 값으로 통일

// 단점 파라미터의 값이 뭔지 모른다. -> 주석 작성필요

setColor({index: 5, color: '#fff'});
/* 결과:
{
    type: 'SET_COLOR',
    payload: {
        index: 5,
        color: '#fff'
    }
}
*/
```

## switch 문 대신 handleActions 사용하기

switch문 사용식 scope → 리듀서 함수

case 에서 let 이나 const 를 변수 이름이 중첩될시엔 에러가 발생

```javascript
handleActions(fn, initialState)

const reducer = handleActions({
  INCREMENT: (state, action) => ({
    counter: state.counter + action.payload
  }),
  DECREMENT: (state, action) => ({
    counter: state.counter - action.payload
  })
}, { counter: 0 });
```

### 미들웨어

![middleware](https://lh3.googleusercontent.com/pw/AM-JKLVvocaXuHTjdTP1bZSxn_Q68z6oQ5CXFg3izj9SNd_uW1qS2riwrCnhD7qiUc5mlYuPg-7uYRkr6tgzf9HcthFAwDIerAvFRpcRthCC3Ondj-RctmjMc37C38KnGFRDKuWCiKM3GA2XxDqpWYG7eJ07=w656-h287-no?authuser=1)

액션과 리듀서 사이의 중간자

액션이 디스패치(dispatch) 되어서 리듀서에서 이를 처리하기전에 사전에 지정된 작업들을 설정