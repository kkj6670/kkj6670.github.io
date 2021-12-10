---
    title: React 디자인 패턴 Presentational&Container Components
    date: 2021-12-07 14:05
    tag: ["디자인 패턴"]
---

## 목적
1. 컴포넌트 재사용성
2. 코드의 가독성이 높아 유지보수에 유리

## Container Component
- 상태를 갖고 있으며, 비동기 작업을 수행하면서 계속적으로 상태가 변경될 수 있다.
- Redux 세계에서는 상태를 Redux 안에서 관리하기 때문에 Presentation Component는 Redux와 직접 연결되는 부분이 없다. Container Component가 React 세계를 Redux와 연결한다.
- React Redux는 우리가 직접 구현하기는 힘든 여러가지 성능 최적화를 해주기 때문이다. 이런 이유에서 Container 컴포넌트를 직접 작성하지 않고 react-redux가 제공해주는 connect()함수를 사용해 container 컴포넌트를 생성하는 것이다.
```javascript
// CommentListContainer.js
import React from "react";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  
  componentDidMount() {
    fetch("/my-comments.json")
      .then(res => res.json())
      .then(comments => this.setState({ comments }))
  }
  
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```

## Presentational Component
- 상태를 갖지 않으며 부모로부터 props을 통해 데이터를 전달받아서 사용한다. 오로지 시각적인 부분만 담당한다. 이벤트 핸들러를 등록하는 정도의 기능을 갖추고 있다. 예외적으로 아주 약간의 상태를 가질 수도 있다.
- Styled Components는 모두 Presentaional Component이다.
- 데이터나 상태에 관해 알고 있는 것이 거의 없어 결합도가 낮기 때문에 재사용성이 높아진다.
```javascript
// CommentList.js
import React from "react";

const Commentlist = comments => (
  <ul>
    {comments.map(({ body, author }) =>
      <li>{body}-{author}</li>
    )}
  </ul>
)
```