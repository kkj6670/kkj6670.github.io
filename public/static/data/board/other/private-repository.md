---
    title: Private Repository 설정
    date: 2021-12-26 16:00
    tag: ["private repository"]
---

## .npmrc
```javascript
registry=http://private-repo/
always-auth=true
email=email
_auth=dXNlcm5hbWU6cGFzc3dvcmQ=

// _auth 아이디,비밀번호 인코딩
echo -n 'username:password' | openssl base64
```

## maven
pom.xml
```xml
<repositories>
    <repository>
        <id>private-repo</id>
        <url>http://private-repo</url>
    </repository>
</repositories>
```

사용자폴더/.m2/settings.xml (window기준 드라이브/Users/유저명/.m2/settings.xml)
```xml
<settings>
    <servers>
        <server>
            <id>private-repo</id> // pom.xml과 일치 해야함
            <username>id</username>
            <password>password</password>
        </server>
    </servers>
</settings>
```