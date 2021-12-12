---
    title: next js Invalid HMR message Error No router instance found
    date: 2021-12-12 15:11
    tag: ["nextjs", "에러"]
---

![오류](https://lh3.googleusercontent.com/pw/AM-JKLUd4RD0U6d59ZtcteFvm63e6qJdYVrf-AbM3-UkDU8kTmXi5afWWt4VJdSDXxDiwDFu3P8HGIGsoXd_BQGVFcN7fv9Uq89uY-op-1ycIjMMg0AW0kCNLgwdTMk3H8LD3SSojbh0gGOgyL_bW-1ZxiXB=w722-h55-no?authuser=0)

Router가 컴포넌트가 렌더링 되기전에 실행되었을때 나는 오류인데 나는 useRouter를 사용하여 문제될것이 없었다.

검색을 해보니 공식 github에 이미 이슈가 올라와 있었고 내용을 확인해보니


![이슈답변](https://lh3.googleusercontent.com/pw/AM-JKLVVo575N_xzE2TkeoipdeA7cNrGD5QUxlzvsYwIVlCedOQlqomLXZDCaXRuKJhezbc14Z5KtgXzTU6N0LB_KKRN32Wzsj-SYluauii79sfg12mXZi2o6pb9OtBc3HktZrYqJPk4UMqcm_x2zPuP860H=w1376-h280-no?authuser=0)

위의 답변처럼 v12.0.5-canary.8버전으로 변경하니 오류가 사라졌다.

([github이슈](https://github.com/vercel/next.js/issues/30710))

