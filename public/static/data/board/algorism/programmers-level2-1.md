---
    title: 프로그래머스 방문 길이 자바스크립트
    date: 2022-01-11 10:20
    tag: ["프로그래머스", "level2"]
---

[문제링크](https://programmers.co.kr/learn/courses/30/lessons/49994)

## 풀이
처음에는 Map객체를 이용하여 풀었는데 이동한 point의 history만 넣어주고 이동하기전 point에서는 history를 안넣어줘서 문제가 생겼었다.
이동하기전 point와 이동한 point를 양방향으로 넣어주려고 하니 Map으로 처리하니 조건문 체크가 중복으로 되고 코드가 지저분해 지는거 같아서 Set으로 변경 하였다.
```javascript
function solution(dirs) {
    const history = new Set();
    let currentPos = '0,0';
    
    for(let i = 0; i<dirs.length; i++) {
        const type = dirs[i];
        const prevPos = currentPos;
        currentPos = move(type, currentPos);
        
        // 좌표평면을 넘어갈수 없어 이동하지 못하고 제자리 였다면 무시
        if(prevPos === currentPos) continue;
        
        // 'p1/p2', p2/p1 형태로 history 저장
        history.add(`${prevPos}/${currentPos}`);
        history.add(`${currentPos}/${prevPos}`);
    }
    
    return history.size / 2;
}

// 이동시 x,y 좌표 반환
function move(type, pos) {
    let [x, y] = pos.split(',');
    
    // 좌표평면 최대치 조건
    if(type === 'U' && y < 5) y++;
    if(type === 'D' && y > -5) y--;
    if(type === 'L' && x > -5) x--;
    if(type === 'R' && x < 5) x++;
    
    return `${x},${y}`;
}
```