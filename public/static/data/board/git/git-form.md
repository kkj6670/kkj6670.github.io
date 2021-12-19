---
    title: Git Fork 설정
    date: 2021-12-19 19:18
    tag: ["fork"]
---
## 초기설정
```shell
// 포크 저장소를 로컬로 클론
$ git clone https://github.com/

// 로컬 저장소로 이동
$ cd ax5ui-kernel

// 현재 설정된 리모트 저장소 조회
$ git remote -v

// 리모트 저장소 추가
$ git remote add upstream https://github.com/

// 리모트 저장소 확인
$ git remote -v
```

## 동기화 작업
```shell
// upstream 최신화
1. git fetch upstream

// merge 필요한 브랜치로 이동
2. git checkout branch

// merge
3. git merge upstream/branch

// push
4. git push origin branch

// 브랜치 삭제
git push origin --delete develop
```