---
    title: react native 기본세팅
    date: 2022-01-08 20:15
    tag: ["react-native", "세팅"]
---
## 설치

```bash
npm install —global expo-cli

playstore -> expo go 설치
```

## project init

```bash
expo init my-app
```

## expo login

```bash
expo login
```

## project start

```bash
yarn start
```

## 테스트

### 스마트폰

1. project start에서 출력된 qr코드를 expo go app에서 qr코드 scan (같은 WIFI 사용해야함)

### PC (Android Studio)

1. Android Studio 설치 ( [https://developer.android.com/studio](https://developer.android.com/studio) )
2. 실행후 Configure → SDK Manager → SDK Platform에서 Android 버전 선택후 apply클릭하여 설치
3. SDK Tools에서 아래항목 설치 (보통 기본적으로 설치되어있음)
    - Android SDK Build-Tools
    - Android Emulator
    - Android SDK Platform-Tools
    - Intel x86 Emulator Acceleraotr
4. AVD Manager → Create Virtual Device 디바이스 선택
5. start된 페이지에 접속 좌측 Run On Android Device/Emulaotr 클릭 또는 터미널에서 a입력

## PC (Snack)

1. [https://snack.expo.dev/](https://snack.expo.dev/) 접속
2. 우측 탭에서 원하는 mode 선택