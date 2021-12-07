---
    title: Git 수정내용 되돌리기
    date: 2021-12-06 18:12
    tag: ["명령어"]
---
## 로컬 수정내역 취소
```shell
// 모든파일
$ git reset --hard

// 특정파일
$ git checkout -- <파일명>
```

## staged 취소
```shell
// kkj6670.md 파일을 Unstage로 변경한다.
$ git reset HEAD kkj6670.md

// 파일명이 없으면 전체를 취소
$ git reset HEAD
```

## commit 취소
1. staged 상태로 워킹 디렉터리에 보존
```shell
$ git reset --soft HEAD^
```

2. unstaged 상태로 워킹 디렉터리에 보존
```shell
$ git reset --mixed HEAD^ // 기본 옵션
$ git reset HEAD^ // 위와 동일
$ git reset HEAD~2 // 마지막 2개의 commit을 취소
```

3. unstaged 상태로 워킹 디렉터리에서 삭제
```shell
$ git reset --hard HEAD^
```