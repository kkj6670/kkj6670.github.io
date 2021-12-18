---
    title: Git Push된 Commit message 수정
    date: 2021-12-18 16:56
    tag: ["명령어"]
---
```shell
git rebase HEAD~[거슬러 올라가고 싶은 커밋 수] -i

git rebase HEAD~1 -i // 예를 들어, 바로 전 커밋의 메세지를 재작성하길 원한다면
```

1. 화면에 나오는 pick -> reword로 변경 (i키 누르면 입력가능)
2. :wq로 편집기를 빠져나옴
3. reword로 바꿨던 커밋들이 순서대로 나옴 메시지 수정
4. :wq로 저장

이미 push된 commit의 경우 처리
```shell
// github에 강제 push (내 원격저장소 내용으로 덮어쓰기 때문에 조심해야함)
git push -f

// 특정 브랜치에 올릴때
git push origin [브랜치명] -f
```

※ 주의사항: rebase로 커밋 내용을 바꿀경우 commit id와 시간이 달라짐.
직전에 올린 경우는 크게 문제가 되지 않지만 만약 5개전 커밋내용을 바꾼다고 했을때 1~5번까지 commit id와 시간이 바뀌기 때문에 다른사람들과 협업시에는 문제가 생길수 있음.
직전 커밋정도가 아니면 최대한 사용을 피하는게 좋음.