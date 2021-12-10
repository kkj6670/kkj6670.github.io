---
    title: Typescript 기존 type 가져오기, 참조
    date: 2021-12-09 21:33
    tag: ["typeof", "type재사용", "type참조"]
---

typescript를 사용하다보면 이미 변수나 함수에 type이 지정되어있고 그것을 그대로 써야할때가 있다.

typeof를 사용하면 type을 재사용 및 참조가 가능하다.

## 기본예제
```typescript
let s = "hello";
let n: typeof s;

// let n: string
```

## ReturnType 활용
```typescript
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

// 아래와 같음
type K = boolean

function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

// 아래와 같음
type P = {
    x: number;
    y: number;
}
```