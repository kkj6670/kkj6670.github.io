---
    title: 프로그래머스 방금그곡 자바스크립트
    date: 2022-01-12 12:10
    tag: ["프로그래머스", "level2"]
---

[문제링크](https://programmers.co.kr/learn/courses/30/lessons/17683)

## 풀이

최종채점에서 자꾸 몇개가 틀리는 경우가 생겨서 조금 해맸었는데 여러개가 일치할때 처리하는 조건이 있었다. 다음부터는 문제를 꼼꼼히 잘 읽어야 할꺼같다.

```javascript
function solution(m, musicinfos) {
    let answer = '(None)';
    
    let tempTime = 0; // 음악이 여러개일경우 제일긴 음악을 찾기위한 변수
    
    for(let i = 0; i<musicinfos.length; i++) {
        const [start, end, title, melody] = musicinfos[i].split(',');
        const time = getMinute(end) - getMinute(start);
        
        let allMelody = '';
        const melodyArray = melodyToArray(melody);
        for(let j = 0; j<time; j++) {
            const idx = j % melodyArray.length;
            allMelody += melodyArray[idx];
        }
        
        if(findMelody(allMelody, m) && tempTime < time) {
            tempTime = time;
            answer = title;
        }
    }
    
    return answer;
}

// 분단위로 변환
function getMinute(time) {
    const [hh, mm] = time.split(':');
    
    return (+hh * 3600) / 60 + +mm;
}

// 멜로디가 일치하는지 확인
function findMelody(allCode, targetCode) {
    const mIdx = allCode.indexOf(targetCode);
    
    if(mIdx !== -1) {
        const nextIdx = mIdx + targetCode.length;
        
        // #처리
        if(allCode[nextIdx] === '#') {
            return findMelody(allCode.slice(nextIdx + 1), targetCode);
        }
            
        return true;
    }
    
    return false;
}

// 멜로디를 array형태로 변환 ['A', 'C#', 'E', D#']
function melodyToArray(str) {
    const arr = [];
    
    for(let i = 0; i<str.length; i++) {
        if(str[i] === '#') continue;
        
        let targetStr = str[i];
        if(str[i + 1] === '#') targetStr += '#';
        arr.push(targetStr);
    }
    
    return arr;
}
```