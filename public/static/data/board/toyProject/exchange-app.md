---
    title: Exchange-App (가상화폐 거래소 메인화면)
    date: 2021-12-17 13:55
    tag: ["거래소", "nestjs 연습"]
---
## 프로젝트 구상계기
1. typescript 학습
2. nestjs 학습
3. 서버 배포 및 관리 학습

이전에 가상화폐 거래소 회사에 다녔을때 거래소 데이터 및 구조도 공부하고 typescript도 같이 공부할겸 연습용으로 만든 프로젝트 였다. 1년~2년 이나 지났었는데 그때당시에 데이터를 전부 하드코딩하여 사용했었다.

이번에 nestjs를 배워보고 싶어서 연습용으로 이전에 만들어 두었던 데이터들과 연결을 하면 좋을꺼 같아서 프로젝트를 진행하게 되었다.

## 기술스택
Front-End: React, Typescript, styled-component

Back-End: Nestjs, PostgreSQL

배포관리: Github Pages(Front-End), heroku(Back-End)

## 주요기능
### 1. 이미지 slider
![이미지 slider](https://lh3.googleusercontent.com/pw/AM-JKLWGFLKUsLYmmQsV-GzY5Uk6JOQKuzuOENGkTlPycRoEXnynvRAS7cRhENDRO4XB1T1u5uU1fauvtFFMKHamYV2ifFFIGL2yevSKS0CSItG55p3zdW6mU3Ge01GickOC7rZl2s6Rtv8ZJIG03rKe2pZr=w2021-h539-no?authuser=1)

### 2. best, worst 상품
![best, worst card](https://lh3.googleusercontent.com/pw/AM-JKLUnTldDpbV0bPw0sw3OEgaIJe7rxEvi892dq3GCqPTvNLi8yww4zUUWZsYKgjQ7VYiyI5YypaxLKne8wn6p6_dENmLWjTMxuPmRW5Pk0UADHpchh-SYuECfZxNAUQImxo_6JmRUZidThY3T257T948c=w2021-h236-no?authuser=1)

### 3. 즐겨찾기 filter 기능
![즐겨찾기 filter 기능](https://lh3.googleusercontent.com/pw/AM-JKLWDgCqjGz1vufqBXRghr2LvTbKIrRH1Rh5QjIVM1KtXgGL9sdApO6tcbgsS61czZrIdh-OLRQ6jpbQmcMM2GBdJHcz2iFB1a2iJ2O8UC3f6LRv94aeclSheX3OJvK8RmyP9y819n63A5n4G3RSW2E99=w249-h66-no?authuser=1)

### 4. 가상화폐 목록 table
![가상화폐 목록 table](https://lh3.googleusercontent.com/pw/AM-JKLX3TlCDOMqEckZ9AkQM4VovGroMX7P36H-Bdrb_JhQdWIE8rZmNizhChVSqtW3PCgJqMii7Fo7_NOM3SbQNd_0ApVgNZe36Pw0wL2W4Bi2usnjRcoum-rpmlo5asnMPSR5NiftIDaxbAXNWLRsnDlDF=w2021-h573-no?authuser=1)

### 5. table 검색기능
![table 검색기능](https://lh3.googleusercontent.com/pw/AM-JKLWPdntx4F9sv1iLIkGU5lnGjkZ236mf4iOGwV0EDf0jpGizqpDoqKhdddG7zCdjvUbVi4N3_6h2IAbsUBiUaUYEqFkBEg0SaZyZe_ZENyinQvM5lrKuk5_SxL2RTmHRKtii2uS50oCjg-cY3VG1SVvw=w2021-h315-no?authuser=1)

### 6. 1개월 동향 chart
![1개월 동향 chart](https://lh3.googleusercontent.com/pw/AM-JKLXcBIGa1Yh4cpD7A-sjq_LG-eYbue-CegzM1ZNXLD1zwRNvr818RpviIO-yNjKSUo_THZzcP2aJkfKWPy5jVP6UM-l_UIwjxvWHcfe2d5wUOecO0iRUzeQ7Mg5H2QzyUpUei7frg0hfi-3O-2fRNkM4=w2021-h552-no?authuser=1)

## 배운점
- typescript 숙달
- nestjs 기본구조
- typeorm 기본문법
- PostgreSQL 기본문법

예전에 java spring을 사용해서 개발을 한 이후(3년전...)로는 백엔드 개발을 할일이 없어서 많이 잊어버린 부분이 많았는데 이번에 nestjs로 개발을 하면서 예전에 했던 내용들이 조금씩 생각이 나게 해줬던 프로젝트였다.

그리고 nestjs가 spring과 구조와 사용법이 비슷한 부분이 많이 있어서 좀 더 쉽게 개발을 진행할수 있었고 DB쪽은 안한지 너무 오래돼서 개발하면서 막히는 부분이 너무 많았다. SQL문법도 다 까먹었는데 orm문법도 별로 써보지 않아서 2가지 모두 익히면서 진행을 해서 시간도 오래 잡아먹었고 프로젝트에서는 크게 어려운게 없었는데도 검색을 많이 해본거 같다...
프로젝트를 더 진행하면서 학습과 숙달이 필요할꺼같다. 물론 nestjs로 개발하는것도 기본적인것만 개발을해서 많은 학습과 숙달이 해야할꺼 같다.

## 아쉬운점
- 아무래도 이전에 하드코딩된 데이터로 구조를 짜다보니 백엔드 개발하면서 바꾸고 싶은 부분이 많이 있었는데 프론트부분은 이미 개발이 끝난상태라 최대한 맞춰서 진행을 했었는데 프론트 구조도 좀 생각없이 짰던 부분이 많았던거 같아서 프론트 개발할때 구조 설계를 좀 더 디테일하게 해볼껄 하는 후회가 있었다. (개발한지 너무 오래된거라 너무 개판이다...)

- 이전에 가볍게 개발했던 부분이라 백엔드 부분에서 api 개발이 필요한 부분도 적었고 테이블도 필요한것만 몇개 만들었었고 업비트 openApi를 통해서 데이터를 가져와서 쓰려고 테이블을 설계하다보니 사실상 설계가 아니라 복사붙여넣기 느낌이여서 다음에는 제대로된 api설계와 db설계를 해보고싶다.

![ERD](https://lh3.googleusercontent.com/pw/AM-JKLXfbXw4tADQdGsRYhrr6QidKTgCE6Rzk5AMAOWCXeE-NQOuobs5RZnkSbSV50tNUonFGcTOrP3l50mK1xwiZEKeRconj-ICW_JmYSi833bOzv8XWHBMRXdIQwk69H3xMpAk6IdHeqyPhFoQnM5Ib8d9=w915-h645-no?authuser=1)

필요한 부분이 상품, 거래정보, 통계정보 뿐이라서 간단하게 테이블 3개만 생성했고 통계부분은 가상화폐 거래량이 많을꺼같아서 따로 통계테이블을 만들어서 설계를 진행했었다.
