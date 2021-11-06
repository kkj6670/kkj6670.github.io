# 테스트글
## 테스트글

### 테스트글

1     

2  

테스트  
테스트  

4

5

```jsx
// props가 바뀌어도 기존 컴포넌트 재사용 ( 재생성x, 기존 state사용 )
<Test test={a} />

// 조건에 따라 컴포넌트 재생성됨
// a < 0이 되면 - <Test> unmount
// a > 0이 되면 - <Test> 재생성
{a > 0 && <Test test={a} />}
{(() => {
  if (a > 0) return <Test test={a} />;
})()}
```