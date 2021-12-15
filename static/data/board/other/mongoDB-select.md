---
    title: MongoDB(몽고디비) 데이터 조회, 검색 기초
    date: 2021-12-15 09:20
    tag: ["MongoDB"]
---

## 배열 특정개수 조회
```javascript
db.getCollection('test_collection').find({ $where: 'this.arrayData.length > 7' });
```

## 데이터 존재여부
```javascript
// testData가 있는 데이터만 조회
db.getCollection('test_collection').find({ testData: { $exists: true } });

// testData가 없는 데이터만 조회
db.getCollection('test_collection').find({ testData: { $exists: false } }); 
```

## 데이터 정렬
```javascript
db.getCollection('test_collection').find().sort({ testData: 1 }); // 1 오름차순, -1 내림차순
```

## 특정 index부터 조회
```javascript
db.getCollection('test_collection').find().skip(100); // 101번째부터 조회
```

## 데이터 개수 제한
```javascript
db.getCollection('test_collection').find().limit(10); // 10개만 출력
```

## 통계 (aggregate)

### group by
```javascript
// testData 컬럼을 그룹화하여 각 데이터와, count 조회
db.getCollection('test_collection').aggregate([
  { $group: { _id: "$testData", count: { $sum: 1 } } },
]); 


// 출력 데이터
/* 1 */
{
    "_id" : "testData1",
    "count" : 10.0
}

/* 2 */
{
    "_id" : "testData2",
    "count" : 5.0
}

/* 3 */
{
    "_id" : "testData3",
    "count" : 3.0
}
```

### where

```javascript
// testData가 a인 데이터 조회
db.getCollection('test_collection').aggregate(
    [ { $match : { testData : "a" } } ]
); 
```

### 활용

1. 중복 데이터 조회 및 카운트
```javascript
db.getCollection('c_annotation').aggregate([
  { $match: { testId: { $exists: true } } },  // 1. testId 데이터가 있음
  { $sort: { testId: -1 } },  // 2. testId 내림차순 정렬
  { $skip: 1000 },  //  3. 1001번째부터 조회
  { $limit: 1000 }, // 4. 1000개만 조회
  { $group: { _id: "$testId", count: { $sum: 1 } } }, // 5. testId 그룹화, count
  { $match: { count: { $gt: 1 } } },  // 6. 5번에서 group화한 데이터중에 count가 1보다 큰것
]);

// 출력 데이터
/* 1 */
{
    "_id" : "testId1",
    "count" : 6.0
}

/* 2 */
{
    "_id" : "testId2",
    "count" : 3.0
}

/* 3 */
{
    "_id" : "testId3",
    "count" : 6.0
}
```
