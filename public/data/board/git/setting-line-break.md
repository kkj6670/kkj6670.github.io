<!--
    BOARD_TITLE: Git 개행문자 설정
    BOARD_DATE: 2021-11-14 16: 45
    BOARD_TAG: ["개행", "설정", "기본세팅"]
-->

## OS별 Line Break
windows : CRLF - CR(Carriage-Return, \r) + LF(Line Feed, \n)
unix, mac : LF(Line Feed, \n)

## Line Break 설정 (core.eol)
- core.eol = native - 기본 OS의 설정으로 사용
- core.eol = crlf - CRLF로 사용
- core.eol = lf - LF로 사용
  
```text
// 설정
git config --global core.eol native

// 조회
git config --global --list|grep core.eol
```

## Auto CRLF 처리 (core.autocrlf)
- core.autocrlf = false - 파일 그대로 check in, check out
- core.autocrlf = true - CRLF -> LF로 변경
- core.autocrlf = input - LF로 사용
```text
// 설정
git config --global core.autocrlf native

// 조회
git config --global --list|grep core.autocrlf
```

## 설정법
### windows
저장소에서 가져올 때 LF -> CRLF로 변경하고
저장소로 보낼 때는 CRLF -> LF 로 변경하도록 true 로 설정한다.
```text
git config --global core.autocrlf true
```
### unix, mac
```text
git config --global core.autocrlf input
```