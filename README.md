## 유튜브 프로젝트

유튜브 API 활용하여 검색/목록/상세 화면 기능 구현

### 사용 기술 스택

<img src="https://github.com/ljw1126/user-content/blob/master/toy/youtube-stack.png?raw=true" alt="기술 스택">

### 결과

**1. 목록 화면**
<img src="https://github.com/ljw1126/user-content/blob/master/toy/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EB%AA%A9%EB%A1%9D.png?raw=true" alt="목록 화면">

**2. 상세 화면**
<img src="https://github.com/ljw1126/user-content/blob/master/toy/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EC%83%81%EC%84%B8.png?raw=true" alt="상세 화면">

> 참고. related API는 2023년부터 제공되지 않아 mostPopular API로 대체 (상세 우측 목록)

---

### Router DOM 모델링

**설치**

```shell
$ yarn add react-router-dom
```

<img src="https://github.com/ljw1126/user-content/blob/master/toy/router-dom.png?raw=true" alt="router dom 모델링">

```javascript
//index.js
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <Videos/>},
            {path: '/videos', element: <Videos/>},
            {path: '/videos/:keyword', element: <Videos/>},
            {path: '/videos/watch/:videoId', element: <VideoDetail/>}
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();
```

```javascript
// App.js 
import './App.css';
import {Outlet} from "react-router-dom";

export default function App() {
    return (
        <Outlet/>
    );
}
```

---

## 추가 작업

### 1. 스켈레톤 로딩

- 유튜브에서 썸네일 로딩 전에 카드 탬플릿이 보여 찾아보니 **"스켈레톤 로딩"** 기법에 대해 알게 됨
- 사용자 경험을 위해 이미지 다운로드가 완료 되었을 때 랜더링 되도록 처리
- 사용 라이브러리 : react-loading-skeleton (<a href="https://www.npmjs.com/package/react-loading-skeleton" target="blank">#링크</a>)

<img src="https://github.com/ljw1126/user-content/blob/master/toy/skeletonLoading.png?raw=true" alt="목록 스켈레톤">

<img src="https://github.com/ljw1126/user-content/blob/master/toy/%EC%83%81%EC%84%B8_%EC%8A%A4%EC%BC%88%EB%A0%88%ED%86%A4.png?raw=true" alt="상세 스켈레톤">
<br/>

### 2. 다크 모드

`useContext`와 `tailwindCSS` 활용하여 다크 모드 기능 구현

<img src="https://github.com/ljw1126/user-content/blob/master/toy/darkMode.gif?raw=true" alt="다크모드">
<br/>

**순서**<br/>
① `tailwind.config.js` 설정 추가 <br/>
② `DarkModeContext.jsx` 생성 <br/>
③ 토글 기능 구현, css 스타일링 (**`dark:`** prefix로 클래스 지정) <br/>

`tailwind` 공식 문서(<a href="https://tailwindcss.com/docs/dark-mode" target="blank">#링크</a>) 참고함 <br/>
우선 다크 모드는 `tailwind.config.js` 설정부터 시작

```text
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector', // *추가
    content: ["./src/**/*.{jsx,js,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
}
```

- `DarkModeContext.jsx` 생성 후 이벤트에 따라 `<html>`태그 클래스 추가 처리 기능 구현 (예. `<html class="dark">`)
- tailwind 제공하는 `dark:` prefix 사용하여 클래스 지정하면 다크 모드시 해당 css 클래스 적용됨

```javascript
// context/DarkModeContext.jsx
import {createContext, useContext, useEffect, useState} from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        updateDarkMode(!darkMode);
    }

    useEffect(() => {
        const isDark = (localStorage.theme === 'dark' || (!('theme' in localStorage)
            && window.matchMedia('(prefers-color-scheme: dark)').matches));
        setDarkMode(isDark);
        updateDarkMode(isDark);
    }, [])

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

function updateDarkMode(darkMode) {
    if (darkMode) {
        document.documentElement.classList.add("dark"); // html 태그에 추가
        localStorage.theme = "dark";
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
    }
}

export const useDarkMode = () => useContext(DarkModeContext);

```

DarkModeContext 우산은 `<Header/> 컴포넌트`에만 유효하여 아래와 같이 태그 포장

```javascript
// App.js
export default function App() {
    return (
        <div className="w-screen h-full max-w-screen-2xl relative">
            <DarkModeProvider>
                <Header/>
            </DarkModeProvider>
            <YoutubeApiProvider>
                <QueryClientProvider client={queryClient}>
                    <Outlet/>
                </QueryClientProvider>
            </YoutubeApiProvider>
        </div>
    );
}

```

Header 컴포넌트에서는`toggleDarkMode` 호출 이벤트만 연결해주면 된다

```javascript
// Header.jsx
const {darkMode, toggleDarkMode} = useDarkMode();
```

### 3. 무한 스크롤 페이지네이션

유튜브에서 스크롤 페이징 방식으로 서비스 제공하고 있어 기능 구현해 봄 <br/>

**react-query 의존성 추가**

```shell
$ yarn add @tanstack/react-query
$ yarn add -D @tanstack/eslint-plugin-query        // 권장
```

```javascript
// App.js
import {Outlet} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient(); // react query
export default function App() {
    return (
        <>
            <Header/>
            <QueryClientProvider client={queryClient}>// react query
                <Outlet/>
                // react router
            </QueryClientProvider>
        </>
    );
}
```

<br/>

`window` 객체 값으로 스크롤 위치 계산하는 방법 대신 라이브러리 활용

**추가 설치**

```shell
$ yarn add react-intersection-observer 
```

간단한 예시를 따라 해보며 분석해 보았다 <br/>

- `ref` 참조가 걸려있는 태그 위치에 스크롤이 도착하면 `inView:boolean` 값이 true가 됨
- 데이터 호출 경우 `useInfiniteQuery` hook의 queryFn 실행
- fetchItems 실행시 `10`개씩 아이템을 가져옴

```javascript
import React, {useEffect} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {fetchItems} from "./api/items";

export default function InfinitePagination() {
    const {data, isLoading, error, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['items'],
        queryFn: fetchItems, // pageParam 인자 전달
        initialPageParam: 0, // 초기 pageParam
        getNextPageParam: (lastPage) => lastPage.nextPage // 다음 pageParam
    });

    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage]);

    return (
        <>
            {isLoading && (<div>Loading...</div>)}
            {error && (<div>{error.message}</div>)}
            {data && data.pages.map(page => {
                return (
                    <div key={page.currentPage} className="flex flex-col gap-2 mt-2">
                        {
                            page.data.map(item => {
                                return <div key={item.id} className="rounded-md bg-gray-400 p-4">
                                    {item.name}
                                </div>
                            })
                        }
                    </div>
                )
            })}
            <div ref={ref}></div>
        </>
    );
}

```

**예시 결과**
<img src="https://github.com/ljw1126/user-content/blob/master/toy/%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4%ED%8E%98%EC%9D%B4%EC%A7%95_%EC%98%88%EC%8B%9C.gif?raw=true" alt="무한 스크롤 페이징 예시">

실제 `youtube api`에 적용을 해본다 <br/>

youtube api 의 경우 response의 `nextPageToken` 값을 다음 request시 `pageToken` 속성으로 보내야 했다<br/>

토큰의 존재 유무에 따라 상태 구분할 필요가 있다 판단하여 `VideoStatus` 정의하여 사용하였다<br/>

```javascript
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useYoutubeApi} from "../context/YoutubeApiContext";
import {useInView} from "react-intersection-observer";
import VideoCard from "../components/VideoCard";

export const VideoStatus = {
    INIT: 'INIT',
    NEXT: 'NEXT',
    END: 'END'
}

export default function Videos() {
    const {keyword} = useParams();
    const {youtube} = useYoutubeApi();

    const {data: videos, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['videos', keyword || 'mostPopular'],
        queryFn: ({pageParam}) => youtube.search(keyword, pageParam),
        initialPageParam: {status: VideoStatus.INIT, token: undefined},
        getNextPageParam: (lastPage) => {
            if (lastPage.nextPageToken) {
                return {status: VideoStatus.NEXT, token: lastPage.nextPageToken};
            }

            return {status: VideoStatus.END, token: undefined};
        },
        staleTime: 1000 * 60 * 5
    });

    const {ref, inView} = useInView({
        threshold: 0.5,
        rootMargin: '100px'
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage]);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>something wrong...</p>}
            {videos && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
                    {
                        videos.pages.map(page => page.items.map(video => (<VideoCard key={video.id} video={video}/>)))
                    }

                    <li ref={ref}></li>
                    {isFetchingNextPage && <p>로딩중......</p>}
                </ul>
            )}
        </>
    );
}
```

queryFn에서 pageParam 파라미터는 아래와 같이 변화하였다 <br/>
① 초기 `initialPageParam` 값이 queryFn의 `pageParam` 속성으로 전달 <br/>
② 다음 페이지 경우 `getNextPageParam` 반환 값이 다음 `pageParam`으로 전달

```text
// 첫 로딩 
"pageParam : {status: 'INIT', token: undefined}"

// 다음 페이지 있는 경우 
"pageParam : {status: 'NEXT', token: 'CBkQAA'}"

// 마지막 페이지 
"pageParam : {status: 'END', token: undefined}"
```

**결과 화면**
<br/>
처음 25개 영상 출력, 이후 스크롤 페이징 개수는 10개씩 출력되도록 하였다

<img src="https://github.com/ljw1126/user-content/blob/master/toy/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EC%8A%A4%ED%81%AC%EB%A1%A4_%ED%8E%98%EC%9D%B4%EC%A7%95.gif?raw=true" alt="유튜브 스크롤 페이징">

**이슈**

- 스크롤 페이징시 ref 지정 태그 감지 안되는 이슈 확인 -> useInView 설정 수정하여 해결

### 4. NotFound 스타일링

처음 div#root에 flex box, 전체 너비 설정하다보니, NotFound 화면에서 레이아웃이 잡히지 않았다 <br/>
그래서 index.css 수정하고 viewport 기준 `w-screen`,`h-screen` 클래스 지정하여 결과 화면 만들었다

```javascript
// NotFound.jsx
return (<div
    className="w-screen h-screen flex flex-col justify-center items-center bg-notFound"
    id="error-page">
    <div
        className="flex flex-col items-center"
        id="error-page-content">
        // 컨텐츠 내용
    </div>
</div>);
```

<img src="https://github.com/ljw1126/user-content/blob/master/toy/notFound.png?raw=true">

