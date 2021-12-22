---
    title: react-router-dom v6 사용법, 마이그레이션
    date: 2021-12-22 12:05
    tag: ["react-router-dom"]
---

React v16.8 이상 필요

## 기본 사용법
```javascript
// v5
<BrowserRouter>
	<Switch>
		<Route exact path='/' component={Home} />
		<Route
			exact
		  path='/user'
		  render={props => (
		    <UserInfo {...props} isLogin={true} />
		  )}
		/>
		<Route path='/info' />
	</Switch>
</BrowserRouter>

// v6
<BrowserRouter>
	{/* 1. Switch -> Routes */}
	<Routes>
		{/* 2. component -> element, element형태로 넘겨야함 <Home /> */}
		<Route path='/' element={<Home />} />
		{/* 3. 속성 사용시 render를 사용해야 했지만 elemnt에서 바로 사용가능 */}
		<Route path='/user' element={<UserInfo isLogin={true} />} />

		{/* 
			4. exact -> 삭제됨 (default로 exact가 적용됨), 적용하지 않으려면 아래처럼 사용
			info 로 시작되는 모든 라우팅 매칭
		*/}
		<Route path='/info/*' />
	</Routes>
</BrowserRouter>
```

## 중첩 라우팅
```javascript
// v5
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/info" component={Info} />
      </Switch>
    </BrowserRouter>
  );
}

function Info() {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}/detail`}>
          <InfoDetail />
        </Route>
      </Switch>
    </div>
  );
}

// v6
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/info' element={<Info />} >
					{/* 1. 밖에서 바로사용 */}
          <Route path='detail' element={<InfoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Info () {
  return (
    <>
      <div>Info<div/>
			{/* 2. 안에서 사용 */}
			<Routes>
				<Route path='detail' element={<InfoDetail />} />
			</Routes>
    </>
  )
}
```

## useHistory → useNavigate
```javascript
// v5
const history = useHistory();

history.push('/home');
history.replace('/home');

// v6
const navigate = useNavigate();

navigate('/home');
navigate('/home', {replace: true});
navigate(-1); // 뒤로가기
navigate(1); // 앞으로 가기
```