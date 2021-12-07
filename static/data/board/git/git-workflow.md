---
    title: Git WorkFlow 전략
    date: 2021-12-03 19:35
    tag: ["workflow", "브랜치 전략"]
---
## Git Flow
5가지의 브랜치
- master : 제품으로 출시될 수 있는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치
- release : 이번 출시 버전을 준비하는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치
- feature : 기능을 개발하는 브랜치

![gitFlow](https://lh3.googleusercontent.com/pw/AM-JKLVoKEdPhqTS0d51gLXvAqtrbsNZfiSxFR8eyEDLS5FNZ3TR4k85NKpC2AWV1p_AVRH1KO3ccoyiy2C-JkyDEY5KHBzREM6t7N-8-nusWZ0NT5TJU4VX1is927F6yzCxpebOsuF7wLxgQJTlg9p6FoyS=w651-h433-no?authuser=1)

장점
- 명령어가 명료하게 나와있다.
- 거의 모든 에디터들과 IDE들에 플러그인으로서 이미 존재하고 있다.

단점
- branch가 뻗어나가는 구조가 복잡하여 관리 등에 어려움이 있다.
- 몇몇 branch는 쓰이지 않을 경우가 있으며 또한 애매한 위치의 branch가 존재한다.

## GitHub Flow
Master 브랜치
- master 브랜치는 항상 최신 상태며, stable 상태로 product에 배포되는 브랜치
- 이 브랜치에 대해서는 엄격한 role과 함께 사용한다
- 브랜치는 항상 master 브랜치에서 만든다
- 새로운 기능을 추가하거나, 버그를 해결하기 위한 브랜치 이름은 자세하게 어떤 일을 하고 있는지에 대해서 작성
- 커밋메시지를 명확하게 작성

![github-flow](https://lh3.googleusercontent.com/pw/AM-JKLX0ze5gRC3Oxk6wcNZfk7iLMrBCAG0qNgk6lOUoipDa8LfoU0mqEd5ds7rhiKMItO690LbMDQTn7k7pOylcY67pbYmgdZerIYcNM9vZR__IgwigbOX4uKt-L-rWjLhn1F35jo3qYlOyFac7rj-78uJF=w583-h276-no?authuser=1)

장점
- branch 구성 전략이 단순하다.
- 처음 git에 대해 접하는 사람에게는 좋은 시스템이 되어준다.
- Github사이트에서 제공해주는 기능을 모두 사용해 작업을 진행하게 도와준다.
- 코드 리뷰를 자연스럽게 사용할 수 있다.
- CI가 필수적이며 또한 배포를 자동으로 진행할 수 있다.

단점
- CI와 배포 자동화가 되어있지 않은 시스템에서는 사람이 해당 업무를 진행해야 한다.
- 프로젝트의 규모가 커짐에 따라 점점 관리에 어려움이 발생할 수 있다.

## GitLab Flow
Master/Production
- 브런치가 존재하여 커밋한 내용들을 일방적으로 디플로이를 하는 형태. GitHub에서 브런치 하나를 더 구성하여 사용하는 이것도 조금은 간단한 구성이다.

![Master, Production](https://lh3.googleusercontent.com/pw/AM-JKLW9-Iq0NC77K08Gyp9h4UvyXqYnMZwqz6jeQU0qaHQAH_oUGcnhkOcNXGcNS1a_mbvrhpXIM8n-ITlDyF90t2yf4a3PoHTjgNBJB-P3GsCiBTC-wX7jCX6EXA8fx7Xh6XEWc-dJkclQQjjQoijSQMgE=w338-h549-no?authuser=1)

Master/Production/Pre-Production
- master와 production 사이에 pre-production을 두어 개발한 내용을 곧장 반영하지 않고 시간을 두고 반영을 하는 것을 말한다.

![Master, Pre-Production, Production](https://lh3.googleusercontent.com/pw/AM-JKLWiLeX0DzsIs0hGv2qtOkuFarX9D22-CQ8TUmr2LPxTRorzAQaFHz5MyZIx5YMMpS3boVZPhO1Z3yqhgXUOR-cq50fNUkGepO2kX-iuNDTr7ZTYbYQ4X2JNz6vRDh7gpF5bNhBqZMyFF2nP3hxNlp3V=w560-h618-no?authuser=1)

Master/stable
- release한 브런치를 두고서 보안상 문제가 발생한 것이나 백 포트를 위해서 작업을 할 경우, cherry-pick을 이용해서 작업을 진행할 수 도 있다. 아니면 해당 릴리즈에서 발생하는 버그들을 묶어서 수정하는 방식으로 작업한다. 일반적으로 말하는 ‘upstream first’ 정책이다.

![Master, Stable](https://lh3.googleusercontent.com/pw/AM-JKLUuqY2Sr_ccLVebcCTMatmGv7mkNnm6JM_GAxZJDnTuhKUptWE7qhvT-InK1FAKZqkBWRv41iE96WayVFbkgTpQ41Tc_ydapd_VOS3Y7pX6DjT-361ZMarTnCuAU4KpmTavssAYQ3zoOFC1r4fs_90K=w550-h719-no?authuser=1)