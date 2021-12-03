---
    title: Git Alias 설정
    date: 2021-11-06 16:52
    tag: ["설정", "단축키", "기본세팅"]
---
## Alias 설정
```text
// 추가
$ git config --global alias.cm commit

// 삭제
$ git config --global --unset alias.ci

// 목록
$ git config --global --get-regexp alias
```

## Alias 기본 설정 모음
```text
// status
git config --global alias.st

// commit
git config --global alias.cm

// branch
git config --global alias.br

// checkout
git config --global alias.co

// Log Style 설정
git config --global alias.lg log "--graph --abbrev-commit --decorate --format=format:'%C(cyan)%h%C(reset) - %C(green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(yellow)%d%C(reset)' --all"
```