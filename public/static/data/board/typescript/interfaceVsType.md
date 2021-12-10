---
    title: Typescript Interface vs Type
    date: 2021-12-08 21:12
    tag: ["기초"]
---

typescript를 사용할때마다 항상 고민되는것이 interface를 사용할것인지 type을 사용할것인지다.

일단 공식문서에서는 인터페이스로 표현할 수 없거나 유니온,튜플을 사용하는 경우가 아니라면 인터페이스 사용을 권장하고 있다고 한다.

그래서 일단은 interface를 사용하고 있지만 막상 남들이 interface와 type의 차이점을 물어볼때 정확한 설명을 못해줄꺼 같아서 정리를 해놓고 생각날때마다 보기위해 정리를 해보았다.

([공식문서](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4))

## 확장방법

### Interface
```typescript
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
```

### Type
```typescript
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: Boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

## 선언병합
기존값에 새로운값 추가

### Interface
```typescript
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

### Type
```typescript
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

 // Error: Duplicate identifier 'Window'.
```