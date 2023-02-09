# Project Karly
### LikeLion Front-End School 4th LAB 14 Vanilla Project - 'Karly'
🖥️Organization github =  https://github.com/likelion-lab14/lab14-project  
🌼Organization Notion = https://www.notion.so/3b559ba8f0f340b18a13e2bb02e6bb09

<div><h2> 🗓️ 기간</h2></div>
2023년 01월 27일 ~ 2023년 02월 09일

<div><h2>🧑‍💻 팀원</h2></div>

<table>
    <tr align="center" >
        <td style="min-width: 200px;">
            <a href="https://github.com/djswns7">
              <img src="https://user-images.githubusercontent.com/82636319/217438702-c88a65cd-6b33-4a1d-99fd-669c234dd092.PNG" width="200">
              <br />
              <b>Wonjun</b>
            </a>
        </td>
        <td style="min-width: 200px;">
            <a href="https://github.com/seoohyeon">
              <img src="https://user-images.githubusercontent.com/82636319/217443325-ba93ac85-86e0-49b7-93f9-1c2c8dfc9146.PNG" width="200">
              <br />
              <b>Seohyeon</b>
            </a>
        </td>
        <td style="min-width: 200px;">
            <a href="https://github.com/DahamWeon">
              <img src="https://user-images.githubusercontent.com/82636319/217443387-8539628e-23c9-4930-8cd5-68563e7b162e.PNG" width="200">
              <br />
              <b>Daham</b>
            </a> 
        </td>
        <td style="min-width: 200px;">
            <a href="https://github.com/YmChoi-Repo">
              <img src="https://user-images.githubusercontent.com/82636319/217443435-ee708f29-af03-44d6-8936-ad0d6a2cb1ff.PNG" width="200">
              <br />
              <b>Youngmin</b>
            </a> 
        </td>
        <td style="min-width: 200px;">
            <a href="https://github.com/choinamechoi">
              <img src="https://user-images.githubusercontent.com/82636319/217443527-7dbfa98f-a219-4416-9c32-0b559f1e4181.PNG" width="200">              
              <br />
              <b>Youngbeom</b>
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
            박원준 <br/>
        </td>
        <td>
            김서현 <br />
        </td>
        <td>
            원다함 <br />
        </td>
        <td>
            최영민 <br />
        </td>
        <td>
            최영범 <br />
        </td>
    </tr>
</table>     

<div><h2>▶️ 실행</h2></div>

### 설치  
    $ git clone https://github.com/likelion-lab14/lab14-project.git
    $ cd lab14-project

### 실행    
    $ npm install    
    $ npm run all    



<div><h2>📚 STACKS</h2></div>

<div> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
</div>  
<img src="https://user-images.githubusercontent.com/38703262/217724365-bfa95a4e-19d1-4a97-a6dd-bb376bd2da32.png"> 
<img src="https://user-images.githubusercontent.com/38703262/217723998-287b65e0-4c81-4e52-843d-a70d51e08772.png"> 

<hr>
<hr>
*구현과제 목표
<hr>

# Vanilla 프로젝트

- 📔 **목차**

---

# 개요

해당 문서는 멋쟁이 사자처럼 프론트엔드 스쿨 4기 ****“**Vanilla 프로젝트를 위한 가이드라인**”입니다.

Vanilla 프로젝트는 HTML / CSS 그리고 Javascript 등 웹의 기본 기술인 웹 표준을 활용하여 진행하고 협업을 위해 Git과 Github을 사용해주세요. 프로젝트 진행을 위해선 5 ~ 6인이 한 팀으로 구성되며 각 팀은 아래 2가지 디자인 시안 중 1개의 시안을 선택하여 진행합니다.

  

디자인 시안 1 : **마켓칼리**

[마켓칼리](https://www.figma.com/file/Jm4FOBWLsQxsrZvn5LZOgI/%EB%A7%88%EC%BC%93%EC%B9%BC%EB%A6%AC?node-id=0%3A1&t=HWR2IXIw3QjlXL8E-1)

디자인 시안 2 : **TAING**

[TAING](https://www.figma.com/file/TZYwqyRpZncFetyZzThM1x/TAING?node-id=81%3A5437&t=pztILLthdfIeopFB-1)

# **프로젝트 진행 시 준수사항**

프로젝트 요구사항을 분석해 구현하기 위한 가이드를 잘 참고해 진행해보세요.

## 웹 표준 마크업 & 스타일링

- 적절한 헤딩 사용 및 시맨틱 마크업에 신경써 주세요.
예 - 버튼 기능을 하는 UI를 마크업 할 때 <div> 등 의미없는 요소를 사용하지 마세요. 
다만 <div> 요소를 사용하지 말라는 의미가 아닙니다.
- 유효성 검증을 통해 문법 오류가 발생하지 않도록 구현해야 합니다.
- 페이지 단위로 구현해주세요. (컴포넌트 단위 구현은 React 프로젝트에서 진행됩니다)
- 스타일 작성 시, [Sass](https://sass-lang.com/) 등 프리프로세서 기술을 자유롭게 사용하셔도 좋습니다. (선택사항)
- 네이밍 컨벤션은 [BEM](https://getbem.com/) 방식을 사용해 주세요. (선택사항)

---

## 웹 접근성

- 이미지의 경우, 대체 텍스트 제공이 필요합니다.
- 마우스로 조작할 수 있는 기능은 키보드로도 접근 및 조작이 가능해야 합니다.
- 폼 컨트롤은 식별 가능한 레이블이 필요합니다. 
(시각적으로 표현되지 않더라도 스크린 리더가 읽을 수 있게 처리해야 합니다)
- 명도대비는 최소 4.5대 1을 준수해야 합니다. (`24px`, `18px Bold`인 경우, 최소 3대 1까지 허용 → [참고](https://www.w3.org/TR/WCAG22/#contrast-minimum))
- 좀 더 상세한 웹접근성 가이드 라인 및 [체크리스트](https://www.notion.so/32d50962016c4c90a04c8447298434fc)는 사람인에서 공개한 정보를 참고해 주세요.
    
    [소개 | 사람인 웹 접근성 교육](https://saramin.github.io/a11y)
    

---

## 웹 프로그래밍

- 처음 제공해드린 `data.json`에 추가적으로 데이터를 모델링하여 주세요.
- 코드의 일관성, 가독성, 함수 분리, 폴더 구조 설계, 코드 품질 등을 기준으로 세부적인 평가가 이루어 집니다.
- [json-server](https://github.com/typicode/json-server)를 사용하여 서버를 구동 하며 해당 사이트에서 제공된 API 명세서를 따릅니다.
    
    [GitHub - typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously)](https://github.com/typicode/json-server)
    
- `README.md` 파일은 꼭 작성해주세요. 팀원 소개와 프로젝트의 소개 등 자유롭게 작성해주시면 됩니다.
- 가능하다면 함수 중심으로 프로그래밍 하여 개발해주세요.

### 메인 페이지 요구사항

- [**swiper.js**](https://swiperjs.com/)를 사용해주세요.
    - 각 슬라이드를 데이터로 받아 동적으로 렌더링 되도록 만들어주세요.
    - 슬라이드의 `prev`, `next` 버튼도 구현해주세요.
    - 키보드 키로도 작동되도록 구현해주세요.
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 사용하여 “시청 중인 컨텐츠 / 최근 본 항목”의 UI를 구성해주세요.
- “마이크로 애니메이션”이 필요하다면 추가해주세요.
- “회원가입 기능”을 구현해주세요.
    - 최소한 이메일, 비밀번호 입력 필드(`input`), 제출 버튼(`button`)을 가지도록 구성해주세요.
- 이메일과 비밀번호의 유효성을 확인합니다.
    - 이메일 조건 : 최소 `@`, `.` 포함
    - 비밀번호 조건 : 8자 이상 입력
    - 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 구현해주세요.
- 회원가입을 통해 사용자(user)를 생성하고 관리합니다.
    - 랜덤 한 문자값 (10자 이상) 을 생성 후 사용자의 Unique ID 값으로 넣어주세요.
    - 해당 유저의 Unique ID를 확인 후 로그인합니다.
    - 응답받은 Unique ID는 `localStorage`에 저장해주세요
    - 다음 번에 로그인 시 Unique ID가 존재한다면 루트 경로로 리디렉션 시켜주세요
    - 어떤 경우든 Unique ID가 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리디렉션 시켜주세요
    - 로그아웃은 클라이언트 단에서 `localStorage`에 저장된 Unique ID를 삭제하는 방식으로 구현합니다.

### 프로젝트 스케폴딩 가이드

[GitHub - simseonbeom/project-template](https://github.com/simseonbeom/project-template)

### 서버 실행

```bash
npm run serve
```

### 클라이언트 실행

```bash
npm run start
```

### 서버와 클라이언트 동시 실행

```bash
npm run all
```

---

## 크로스 브라우징

[Chrome](https://www.google.co.kr/chrome/?brand=CHBD&gclid=Cj0KCQiA_P6dBhD1ARIsAAGI7HCkKHmRUA37MyyZL1ncHFH3j3ksUAGN8MwjAVt-D8VDhqQJSI6uJxcaAsj-EALw_wcB&gclsrc=aw.ds), [Firefox](https://www.mozilla.org/ko/firefox/new/), [Safari](https://www.apple.com/kr/safari/), [Edge](https://www.microsoft.com/ko-kr/edge?form=MA13FJ) 등 모던 브라우저 환경에 맞춰 동작 가능하도록 구현 합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6e4b057-b003-40ce-bf5f-ce3c34a0041c/Untitled.png)

---

## 검색 엔진 최적화

- SEO(Search Engine Optimization)를 고려해 주세요.
- Google SEO 기본 가이드 ([참고](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko))
- Open Graph Protocols 가이드 ([참고](https://ogp.me/) | [오픈 그래프 사용하기](https://velog.io/@sweetpumpkin/Open-Graph-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0))

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c0215448-cef5-4aa6-bfa2-536b83a795ce/Untitled.png)

---

## 성능 최적화

- 이미지 최적화([PNG, JPG](https://tinypng.com/) / [GIF](https://ezgif.com/)) 및 웹 사이트 최적화를 위해 노력해 주세요.
    - [Core Web Vitals](https://web.dev/vitals/)
    - [Google PageSpeed](https://pagespeed.web.dev/)
    - [Light House](https://github.com/GoogleChrome/lighthouse) 등

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fbc5b178-fe51-4127-9624-e8413260dda5/Untitled.png)

---

## 프로젝트 구성 및 관리

- 팀이 함께 사용할 공동 Github 저장소를 통해 프로젝트(project)를 관리해주세요.
- 팀원 간 소통 채널은 가급적 Github 이슈(issue)와 디스커션(discussion)를 사용하는 것을 권장합니다.
- 프로젝트 진행 상황을 진단하고 회고할 수 있도록 마일스톤(milestone, 이정표)을 추가 관리해야 합니다.
- 디스코드(discord) 구독(web hook) 플러그인을 활용해 알림(notification) 기능을 사용합니다.
- 풀 리퀘스트(PR) 기능을 사용해 `develop` 브랜치 병합(merge) 전, 코드 리뷰를 팀원과 합니다.

[자료 공유 - Google Drive](https://vo.la/eM9WVB)

**Project Collaboration “Beginning”** 특강 발표 자료 (PDF)

### 오리엔테이션 이후, 프로세스

1. 프로젝트 목표 설정 (공동 / 개인) 
2. 스크럼 프로세스 프레임 워크 검토 (특강 자료 참고)
3. 스크럼 마스터 및 개발 팀 역할 설정 
4. 제품 백로그 : 요구사항 분석 → 우선 순위 관리 검토 (공동 논의) [ GitHub 프로젝트 생성 ]
5. 스프린트 백로그 : 제품 백로그를 나눠 스프린트 목표 작업 설정 (공동 논의) [ GitHub 마일스톤 생성 ]
6. 1주차 스프린트 계획 회의 진행 (공동 또는 개인 목표 작업 할당)
7. 데일리 스크럼 진행 (약 15분간 오늘 / 내일 할 일, 이슈 등 논의) [ GitHub 위키에 정리 ]
8. 브랜치, 커밋, 코딩 컨벤션 논의 (공동)
9. GitHub 레이블 및 이슈 논의 후 템플릿 작성 (공동)
10. 공동, 개인 할 일에 따라 오늘 할 일 구현 (화이팅!)

---

## 발표

- 발표 형식에는 별도의 제한을 두지 않습니다.
- 발표시간은 10~15분 입니다. 발표시간 준수를 부탁드립니다.
- 데모데이에 발표 자료는 온라인 도구를 활용해 준비해주세요.
    - [Google Slides](https://www.google.com/intl/ko_kr/slides/about/)
    - [Slides](https://slides.com/)
    - [Canva](https://www.canva.com/)
    

<aside>
☝ 위에 추천한 서비스 외에 온라인 공개 URL을 제공하는 서비스라면 어떤 것을 이용해도 좋습니다.

</aside>

---

COPYRIGHT RESERVED. @ **EUID**
