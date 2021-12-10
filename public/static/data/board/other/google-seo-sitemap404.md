---
    title: Google SEO 처리 sitemap.xml 404 가져올수 없음
    date: 2021-12-10 13:55
    tag: ["google seo", "sitemap"]
---

Google SEO 처리시 처음에 URL 등록을 하고 sitemap.xml을 등록한다.

찾아보고 진행을 했지만 두개다 아래처럼 찾지 못하고 적용이 안되는 문제가 생겼다.
![색인 404](https://lh3.googleusercontent.com/pw/AM-JKLXgm4YujU5RH4gQdcW5esbNuT4n7oOeLVVdXCtXpS_CRfiM0jYbKOss_HjjTBX_gu1xd4e5vGDg4_ESHtex0QpwY9rfZqXhJl7RaN2qh73d8LXm9OP4vAe1jTlQSrFURjCk8kxN3XK4Pzozner09ruA=w1150-h835-no?authuser=1)
![sitemap 404](https://lh3.googleusercontent.com/pw/AM-JKLXEZYL62JqiVJnuxOp_M8atIpmLSdQB7vnrFKt9xzgCsiMPZWDJ3A8qPZh3ouV-yx5ZT-sbovVtaHp93RMSFK53t5w_EXmVAn4gfsvpKn3IRG7FnyUdUyC-VxFsMn6ofhxd9TpSuDLyeqvVPClYqMUR=w1145-h506-no?authuser=1)

sitemap 등록시 안되는 부분은 등록할때 주소를 변경하면 해결이 된다는 글들이 있어서 사용가능한 방법은 다 해보았다.
1. sitemap.xml -> /sitemap.xml
2. sitemap.xml -> sitemap
3. sitemap -> /sitemap
  
<br />
위 방법으로 다 해보았지만 여전히 가져올수 없어서 혹시 파일 위치가 문제인가 해서 static에도 올려보았지만 전부 되지 않았다.

그래서 찾아보니 나와같은 문제를 겪은 사람이 최근들어 많이 있었고 아래와 같은 답변이 있었다.
![답변](https://lh3.googleusercontent.com/pw/AM-JKLV-7Cy6_-J0hPfBsP74_Bkt8BqkpHzvn8ce3AlxxpTaQoK02dxPp9RSXCu4mEsX_zfmeqIpVeu2Zu8iCbsI2nGGaArGbEJvDpLOzLNLOw7Esw_GFiOYwGvzZCoORKxFzDHIFypBq5utgvkhoQxV_kWR=w1040-h208-no?authuser=1)
위 답변을 보고 1~2일 정도 기다려 보기로 했고 기다린 결과
![색인 정상](https://lh3.googleusercontent.com/pw/AM-JKLXFAXU8z3wH68_qx79VAQZqWdGsgw9xWl3PV54bFqU2VY-GB_MudMKiBDevu3JhJyf9GkdPdfcTeldOzEaeNh9j8cSRAyZIzl9KV2RTHx8nN5RGydYfkb2zXUG3PgX6tk4PLg8RmqVZEWlbCwQhLER5=w1228-h564-no?authuser=1)
![sitemap 정상](https://lh3.googleusercontent.com/pw/AM-JKLU1cuqzBhzZSqpK3gxYvpeBnWCKg7WCSr6urzcHzjLOoFH-7ncIrKcKl-mCNT6LmG3Dx-HnzrfvrFJuHUhuzmrF0xc44Y6v-iZRa3BSQdCq5Uc2eIeCpirMiWAzzKEtLZA1xCIInMFECGKKcCnomQX3=w1352-h571-no?authuser=1)
URL정보와 stiemap을 정상적으로 가져오는것을 확인할수 있었다.

처음에 안되서 내가 잘못입력한건가, 파일이 잘못 올라갔나, 접속이 안되나 여러가지 찾아보고 시간이 지났지만 해결이 안돼서 열받았었는데 그냥 기다리니 해결이 돼서 너무 허무했지만 해결되어서 다행이다.