---
    title: getStaticProps Typescript 적용
    date: 2021-12-09 21:33
    tag: ["typeof", "nextjs"]
---

nextjs의 getStaticProps에 typescript 적용을 하면서 정리한 내용

## 기본예제
```typescript
// 1. GetStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category?.toString() || '';

  const boardList = getBoardList(category);

  return {
    props: {
      boardList,
    },
  };
};

// 2. InferGetStaticPropsType<typeof getStaticProps>
const BoardListPage = function ({ boardList }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BoardList data={boardList} />;
};
```

## 기본예제 문제점
하지만 위와같이 getStaticProps의 전체 타입을 지정해 버리면 아래와같이 any타입으로 지정이 된다.

![boardList type](https://lh3.googleusercontent.com/pw/AM-JKLVRiCF6W42QDvUoR2flELBj-0zFCvbDCdRrKTiVIZ36NKEfUgPWXR_hs_zEcdngHz4prT2T0C4epHT6AZu01uam9hduOiGJmxlnMXfwYp6Wd2n-HKK9FCaXxnDJIob3phOrBO-jEs6WS0aMxHOvIbTR=w332-h128-no?authuser=1)

GetStaticProps type을 보면 그 이유를 알수가 있다.

```typescript
export type GetStaticPropsResult<P> =
  | { props: P; revalidate?: number | boolean } // 3. props의 type은 아래에서 받아온 P값
  | { redirect: Redirect; revalidate?: number | boolean }
  | { notFound: true; revalidate?: number | boolean }

export type GetStaticProps<
  P extends { [key: string]: any } = { [key: string]: any },  // 1. P값 { [key: string]: any }
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (
  context: GetStaticPropsContext<Q, D>
) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P> // 2. GetStaticPropsResult에 P값을 넘김
```

## 해결방안
any로 나올경우 상당히 거슬리고 애초에 typescript를 사용하는 의미가 사라지기때문에 type을 가져올수 있도록 지정을 해주었다.
```typescript
export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const category = params?.category?.toString() || '';

  const boardList = getBoardList(category);

  return {
    props: {
      boardList,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/board/javascript'],
    fallback: true,
  };
}

const BoardListPage = function ({ boardList }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BoardList data={boardList} />;
};
```

위와같이 적용을 하고나면 아래같이 boardList의 type을 가져오는걸 확인할수 있다. 편안...
![boardList type2](https://lh3.googleusercontent.com/pw/AM-JKLUeHbmsJXoKCi9nftN2bGtWSO9vHoqzMvxumAtkaPpLVHOAf_axgLQVtmGuMn-3VNg_xIsNdfIHGcoueg4944yd7Z2FepYPV3rLm-V-1XLUxevQfkeoA1fQkSmejNwavzmpNVxXtd5q23E2EM6Tl-ZJ=w423-h70-no?authuser=1)