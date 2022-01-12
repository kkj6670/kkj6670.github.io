---
    title: 프로그래머스 피보나치 수 자바스크립트
    date: 2022-01-11 10:20
    tag: ["프로그래머스", "level2"]
---

[문제링크](https://programmers.co.kr/learn/courses/30/lessons/12945)

## 풀이

- 첫번째 풀이
```javascript
function solution(n) {
    let temp = 0;
    let n1 = 1;
    let n2 = 1;
    
    for(let i = 3; i<=n; i++) {
        temp = n1 + n2;
        
        n1 = n2;
        n2 = temp;
    }
    
    return temp % 1234567;
}
```

처음에 이렇게 풀었는데 7번 케이스부터 오류가 났고 도저히 왜 안되는지 몰라서 다른사람들이 올려놓은 질문을 보았다.
내용을 보니 자바스크립트 정수 범위가 넘어가서 계산이 제대로 되지 않는 문제였고 아래처럼 수정하였다.

- 두번째 풀이
```javascript
function solution(n) {
    let temp = 0;
    let n1 = 1;
    let n2 = 1;
    
    for(let i = 3; i<=n; i++) {
        temp = n1 % 1234567 + n2 % 1234567;
        
        n1 = n2;
        n2 = temp;
    }
    
    return temp % 1234567;
}
```

자바스크립트의 정수계산범위(Number.MAX_SAFE_INTEGER)가 있다는것과 어느정도 크기가 넘어가면 지수표현식으로 표현된다는것 정도만 알고 있었는데 실제로 그러한 수를 써볼일은 없어서 생각지도 못하고 있어서 고생을 한것같다.