---
    title: javascript ios safari new date invalid Date
    date: 2022-04-19 10:24
    tag: ["safari", "ios", "new date"]
---
## 이슈
웹앱을 개발하는중에 날짜관련 처리를 해야할일이 있어서 개발을 진행하는데
나는 특정한 현재 날짜를 만들때 보통 아래처럼 만들었다.
```js
const targetDate = new Date('2022-04-19 10:29');
```

하지만 safari 에서는 해당 형식을 지원하지 않아서 제대로 작동을 안했다 ㅠ
기존에는 크롬만 신경을써서 상관이 없었는데 safari쪽은 지원이 안되는지 몰랐는데 당황 스러웠다.

## 해결방안
찾아보니 아래처럼 적용이 가능했다.
```js
const targetDate = new Date(year, month, day, hours, minutes, seconds, milliseconds);
const targetDate2 = new Date('year-month-dayThh:mm:ss');

const targetDate3 = new Date();
targetDate3.setFullYear(2022);
targetDate3.setMonth(3);
targetDate3.setDate(19);
targetDate3.setHours(10);
targetDate3.setSeconds(29);
```