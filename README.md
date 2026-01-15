# Coreline - Engineering First AI & Software Studio

<a href=https://coreline-project.vercel.app/><img width="175" height="67" alt="스크린샷 2026-01-10 오후 2 31 57" src="https://github.com/user-attachments/assets/4c3c9f3e-a214-4947-9436-d1b37fe2cc64" /><a/>

![Coreline](https://img.shields.io/badge/Coreline-Engineering%20Studio-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-cyan.svg?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**Coreline**은 엔지니어링 중심의 AI 및 소프트웨어 스튜디오를 위한 포트폴리오 웹사이트입니다. 단순한 프로토타입을 넘어, 지속 가능하고 실제 프로덕션 환경에서 운영 가능한 고품질 솔루션을 제공하는 역량을 보여주기 위해 제작되었습니다. - Demo Web Page + Backend 개발 진행 중! >> https://github.com/coreline-ai/python_simple_saas_fullstack 리팩토링 예정

**Simple Dev Profile** 여기에 심플 풀스택 페이지 https://github.com/coreline-ai/fullstack_profile_public 참고 하시면 됩니다.

이 프로젝트는 최신 **Next.js 16 (App Router)** 와 **React 19**를 기반으로 구축되어 있으며, 서버 컴포넌트를 활용하여 최적의 성능을 제공합니다.

## ✨ 주요 기능 (Key Features)

- **서비스 쇼케이스**: AI 엔지니어링, 소프트웨어 개발, 아키텍처 설계 등 핵심 서비스를 카드 형태로 소개합니다.
- **프로젝트 포트폴리오**: 실제 사례를 통해 문제 해결 과정과 사용된 기술 스택을 상세히 보여줍니다.
- **개발 프로세스**: 문제 정의부터 운영까지, 체계적인 개발 방법론을 시각적으로 안내합니다.
- **반응형 디자인**: 데스크톱, 태블릿, 모바일 등 모든 기기에서 최적화된 화면을 제공합니다.
- **다크 모드 지원**: 사용자 선호에 따른 라이트/다크 모드 전환이 가능합니다.
- **성능 최적화**: Next.js의 기능을 활용하여 빠른 로딩 속도와 우수한 SEO를 보장합니다.

## 🚀 최신 업데이트 (Recent Updates)

### ⚡️ 최근 변경 사항 (2026.01.10)

- **컴포넌트 아키텍처 (Architecture)**: 거대한 단일 파일이었던 `page.tsx`를 8개의 모듈형 컴포넌트로 리팩토링하여 유지보수성을 대폭 향상시켰습니다.
- **브랜드 아이덴티티 (Identity)**: 헤더, 푸터, 네비게이션 전반에 새로운 로고 시스템(`logo.svg`)을 적용하여 브랜드 일관성을 확보했습니다.
- **접근성 강화 (Accessibility)**: 스크린 리더 사용자를 위해 모든 프로젝트 이미지에 상세한 설명(`alt` 텍스트)을 추가했습니다.
- **성능 및 헬스 체크 (Performance)**: 모든 `<img>` 태그를 `next/image`로 교체하여 로딩 속도를 최적화하고, 런타임 에러 0건을 검증했습니다.
- **안정성 (Stability)**: ESLint 의존성을 안정적인 버전(v8)으로 고정하여 빌드 파이프라인의 안전성을 확보했습니다.
- **유지보수 및 타입 안전성 (Type Safety)**:
  - 엄격한 타입스크립트 검사(`tsc`)를 적용했습니다 (`ignoreBuildErrors` 플래그 제거).
  - 모든 페이지의 헤더 텍스트를 Title Case ("Coreline")로 통일하여 표준화했습니다.
  - 서브 페이지에서 불필요한 "Sign Up" 메뉴를 제거하여 사용자 흐름을 간소화했습니다.
  - 다크 모드에서의 사용자 경험을 개선했습니다 (Login 버튼 호버 시 브랜드 시그니처 옐로우 컬러 적용).
- **시스템 회복탄력성 (System Resilience)**:
  - **에러 핸들링**: 커스텀 404 페이지(`not-found.tsx`)와 글로벌 에러 바운더리(`error.tsx`)를 구현하여 예외 상황에서도 브랜드 경험을 유지합니다.
  - **UX/DX**: 페이지 전환 로딩(`loading.tsx`)과 코드 포맷터(Prettier)를 도입하여 품질을 한 단계 높였습니다.

### 🎨 이전 업데이트

- **UI 개선**: 컬렉션 및 헤드라인에 시그니처 옐로우 스타일을 적용했습니다.
- **네비게이션**: 부드러운 스크롤 및 서비스 딥 링킹 기능을 강화했습니다.
- **다크 모드**: 명암비 및 시각적 위계를 최적화했습니다.

## 🛠 기술 스택 (Tech Stack)

| 분류              | 기술         | 버전      | 설명                                              |
| ----------------- | ------------ | --------- | ------------------------------------------------- |
| **프레임워크**    | Next.js      | `^16.1.1` | App Router 기반의 서버 사이드 렌더링 및 정적 생성 |
| **라이브러리**    | React        | `^19.2.3` | 최신 리액트 기능 및 Hooks 활용                    |
| **언어**          | TypeScript   | `~5.8.2`  | 정적 타입 시스템을 통한 안정성 확보               |
| **스타일링**      | Tailwind CSS | `^4.1.18` | 유틸리티 퍼스트 CSS 프레임워크                    |
| **패키지 매니저** | npm          | -         | 의존성 관리                                       |

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 사전 요구사항

- Node.js (v18.17 이상 권장)
- npm

### 설치 및 실행

1.  **저장소 클론**

    ```bash
    git clone https://github.com/coreline-ai/web_coreline_public.git
    cd web_coreline_public
    ```

2.  **의존성 설치**

    ```bash
    npm install
    ```

3.  **개발 서버 실행**

    ```bash
    npm run dev
    ```

    브라우저에서 `http://localhost:3000`을 열어 확인합니다.

4.  **프로덕션 빌드 & 실행**
    ```bash
    npm run build
    npm run start
    ```

## 📂 폴더 구조 (Folder Structure)

```bash
/
├── app/                  # 메인 애플리케이션 (App Router)
│   ├── components/       # UI 컴포넌트
│   │   ├── home/         # 랜딩 페이지 섹션 (Hero, Services, Navigation 등 8개 모듈)
│   │   ├── SimpleHeader.tsx # 서브 페이지용 헤더
│   │   └── ThemeProvider.tsx # 다크 모드 Provider
│   ├── constants.tsx     # 프로젝트 데이터 및 상수
│   ├── globals.css       # Tailwind v4 & 커스텀 스타일
│   ├── layout.tsx        # Root Layout & Theme Provider
│   ├── loading.tsx       # [New] 로딩 UI
│   ├── not-found.tsx     # [New] 404 에러 페이지
│   ├── error.tsx         # [New] 글로벌 에러 바운더리
│   ├── page.tsx          # 메인 페이지 (Composition Root)
│   └── types.ts          # TypeScript 정의
├── docs/                 # 프로젝트 문서 (PRD, PRD_ko)
├── public/               # 정적 파일 (logo.svg, robots.txt, sitemap.xml)
├── next.config.mjs       # Next.js 설정
└── package.json          # 의존성 정보
```

## 📜 라이센스 (License)

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

```
MIT License

Copyright (c) 2026 Coreline

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
