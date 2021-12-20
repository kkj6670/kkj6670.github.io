---
    title: Git cherry-pick commit 가져오기
    date: 2021-12-20 20:34
    tag: ["명령어"]
---

commit을 가져와 새로운 commit을 만드는것이기 때문에 commit 트리가 꼬이거나 잘못하면 conflict이 날수 있기 때문에 간단한 버그수정 등이 아니면 사용하지 않는것이 좋다.
특히 해당 commit이 하위에 올려두었던 commit과 의존성이 있다면 모두 가져와야 하기 때문에 그럴경우에는 사용하지 않는것이 좋아보인다.
```javascript
// 로그 확인
git log --pretty=oneline

// 커밋 가져오기
git cherry-pick <commit_id>

// conflict 발생시
1. 코드를 수정하여 해결
Conflict을 해결하기 위해 코드를 수정한다.
git add <path> 명령어로 수정된 코드를 올린다. (커밋은 다시 할 필요 없다.)
git cherry-pick --continue 명령어를 사용하면 다시 진행이 시작 될 것이다.

2. cherry-pick 중단
git cherry-pick --abort

// cherry-pick merge
git cherry-pick -m 1 <merge_commit_hash>
```