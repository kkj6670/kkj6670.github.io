---
    title: 블로그 개발시 md파일 처리,파싱 (gray-matter)   
    date: 2021-12-14 13:50
    tag: ["md", "gray-matter"]
---


블로그를 직접 개발시 md파일에 글정보를 담아서 사용을 많이 한다.

그렇게 사용했을때 gray-matter를 사용하면 데이터를 쉽게 만들수 있다.

## 데이터 예시
```javascript
// md파일
---
title: 글제목
date: 2021-12-14 13:50
tag: ["md", "gray-matter"]
---
글내용

// gray-matter 사용시 데이터
{
  content: '글내용',
  data: { 
    title: '글제목', 
    date: '2021-12-14 13:50' 
    tag: '["md", "gray-matter"]' 
  }
}
```

## 사용법
```javascript
import matter from 'gray-matter';

const md = fs.readFileSync('./test.md', 'utf8');  // 1. md파일 get
const {
  data: { title, date, tag },
  content
} = matter(md); // 2. matter로 md파일 파싱
```