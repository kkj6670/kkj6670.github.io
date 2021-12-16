---
    title: git 임시저장, 백업 (stash)
    date: 2021-12-16 18:20
    tag: ["stash"]
---

현재 작업을 스택에 잠시 저장후 나중에 사용할때 유용하다.

![stash 구조](https://lh3.googleusercontent.com/pw/AM-JKLWibSSbZsJJVeciP1v-1wzzjW2bAatEY0p4mduVec17uNa3bpwQmEIRIcG59X1aIatrCTxIginK5Z8Q8FDScNodmbWmGu4X9YEpW0tjzG2NMdaWsMZYb9hgUr4PS-quZF-evdOqYU9ukOEJC_YqsM3t=w600-h371-no?authuser=0)


## 저장
새로운 stash를 스택에 만들어 하던 작업을 임시로 저장한다
```shell
git stash

git stash save name // 리스트 조회시 보여질 이름
```

## 조회
stash 한 기록을 리스트 형태로 조회 (삭제하지 않으면 남아 있음)
```shell
git stash list
```

## 복원
```shell
// 마지막으로 저장한 stash를 복원, 리스트 제거 o
git stash pop

// 마지막으로 저장한 stash를 복원, 리스트 제거 x
git stash apply

// stashId로 복원
git stash apply stash@{0}
```

## 삭제
```
// 가장 최근에 저장한 stash를 삭제 한다.
git stash drop

// stashId로 삭제
git stash drop stash@{0} 

// 전체 리스트 삭제
git stash clear
```