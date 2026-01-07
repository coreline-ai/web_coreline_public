# Coreline - Engineering First AI & Software Studio

![Coreline](https://img.shields.io/badge/Coreline-Engineering%20Studio-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-cyan.svg?logo=tailwind-css)

## 1. 소개 (Introduction)

**Coreline**은 엔지니어링 중심의 AI 및 소프트웨어 스튜디오를 위한 포트폴리오 웹사이트입니다. 이 플랫폼은 단순한 프로토타입을 넘어, 지속 가능하고 실제 프로덕션 환경에서 운영 가능한 고품질 솔루션을 제공하는 역량을 보여주기 위해 제작되었습니다.

이 프로젝트는 Next.js(App Router)를 기반으로 구축되어 있으며, 서버 컴포넌트를 활용하여 최적의 성능을 제공합니다.

## 2. 주요 기능 (Key Features)

-   **✨ 서비스 쇼케이스**: AI 엔지니어링, 소프트웨어 개발, 아키텍처 설계 등 핵심 서비스를 소개합니다.
-   **📚 프로젝트 포트폴리오**: 실제 사례를 통해 문제 해결 과정과 기술적 성과를 상세히 보여줍니다.
-   **⚙️ 개발 프로세스**: 문제 정의부터 운영까지, 체계적인 개발 방법론을 시각적으로 안내합니다.
-   **🛠️ 기술 스택**: 프론트엔드, 백엔드, AI, 인프라 등 보유한 기술 전문성을 보여줍니다.
-   **📱 반응형 디자인**: 데스크톱, 태블릿, 모바일 등 모든 기기에서 완벽한 사용자 경험을 제공합니다.
-   **⚡️ 성능 최적화**: Next.js의 서버사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 통해 빠른 로딩 속도와 우수한 SEO를 보장합니다.

## 3. 기술 스택 (Tech Stack)

-   **프레임워크**: Next.js 16 (App Router)
-   **라이브러리**: React 19
-   **언어**: TypeScript
-   **스타일링**: Tailwind CSS
-   **아이콘**: Lucide React (예정)

## 4. 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 4.1. 사전 요구사항

-   Node.js (v18.17 이상)
-   npm, yarn 또는 pnpm

### 4.2. 설치

1.  저장소를 클론합니다.
    ```sh
    git clone https://github.com/your-username/coreline-engineering-studio.git
    cd coreline-engineering-studio
    ```

2.  의존성을 설치합니다.
    ```sh
    npm install
    ```

## 5. 사용법 (Available Scripts)

-   **개발 서버 실행**:
    ```sh
    npm run dev
    ```
    브라우저에서 `http://localhost:3000`을 엽니다.

-   **프로덕션 빌드**:
    ```sh
    npm run build
    ```

-   **빌드된 앱 실행**:
    ```sh
    npm run start
    ```

-   **코드 린팅**:
    ```sh
    npm run lint
    ```

## 6. 폴더 구조 (Folder Structure)

이 프로젝트는 Next.js App Router의 표준 폴더 구조를 따릅니다.

`
/
├── app/                  # 메인 애플리케이션 (라우팅, 페이지)
│   ├── layout.tsx        # 전역 레이아웃
│   ├── page.tsx          # 랜딩 페이지
│   └── globals.css       # 전역 스타일
├── components/           # 재사용 가능한 UI 컴포넌트 (예정)
├── public/               # 정적 파일 (이미지, 폰트 등)
├── docs/                 # 프로젝트 문서 (PRD 등)
├── package.json          # 의존성 및 스크립트
└── tsconfig.json         # TypeScript 설정
`

## 7. 향후 계획 (Future Considerations)

-   **🤖 Gemini AI 통합**: `GEMINI_API_KEY`를 활용한 AI 기능 추가
-   **✍️ 블로그/인사이트**: 기술 관련 콘텐츠를 공유하는 섹션 추가
-   **🗂️ CMS 연동**: 프로젝트 및 서비스 콘텐츠를 쉽게 관리할 수 있도록 CMS 도입
