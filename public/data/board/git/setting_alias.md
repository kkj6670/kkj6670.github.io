<!--
    BOARD_TITLE: Alias 설정
    BOARD_TAG: ["기본세팅", "처음"]
-->
# 목차1
## 목차2
### 목차3
### 목차4

# 목차1
## 목차2
### 목차3
### 목차4
### 목차5

## 추가
```text
$ git config --global alias.cm commit
```

## 삭제
```text
$ git config --global --unset alias.ci
```

## 목록
```text
$ git config --global --get-regexp alias
```

## Log Style 설정
```text
git config --global alias.lg log "--graph --abbrev-commit --decorate --format=format:'%C(cyan)%h%C(reset) - %C(green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(yellow)%d%C(reset)' --all"
```