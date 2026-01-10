# Coreline - Engineering First AI & Software Studio

<a href=https://web-coreline-public.vercel.app/><img width="164" height="64" alt="스크린샷 2026-01-08 오후 10 20 51" src="https://github.com/user-attachments/assets/c0aef752-6a84-4cab-85d4-1207225c2e0a" /><br /> DEMO 보기<a/>

![Coreline](https://img.shields.io/badge/Coreline-Engineering%20Studio-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-cyan.svg?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**Coreline**은 엔지니어링 중심의 AI 및 소프트웨어 스튜디오를 위한 포트폴리오 웹사이트입니다. 단순한 프로토타입을 넘어, 지속 가능하고 실제 프로덕션 환경에서 운영 가능한 고품질 솔루션을 제공하는 역량을 보여주기 위해 제작되었습니다. - Demo Web Page + Backend 개발 진행 중!

**Simple Dev Profile** 여기에 심플 풀스택 페이지 https://github.com/coreline-ai/fullstack_profile_public 참고 하시면 됩니다.

이 프로젝트는 최신 **Next.js 16 (App Router)** 와 **React 19**를 기반으로 구축되어 있으며, 서버 컴포넌트를 활용하여 최적의 성능을 제공합니다.

## ✨ 주요 기능 (Key Features)

-   **서비스 쇼케이스**: AI 엔지니어링, 소프트웨어 개발, 아키텍처 설계 등 핵심 서비스를 카드 형태로 소개합니다.
-   **프로젝트 포트폴리오**: 실제 사례를 통해 문제 해결 과정과 사용된 기술 스택을 상세히 보여줍니다.
-   **개발 프로세스**: 문제 정의부터 운영까지, 체계적인 개발 방법론을 시각적으로 안내합니다.
-   **반응형 디자인**: 데스크톱, 태블릿, 모바일 등 모든 기기에서 최적화된 화면을 제공합니다.
-   **다크 모드 지원**: 사용자 선호에 따른 라이트/다크 모드 전환이 가능합니다.
-   **성능 최적화**: Next.js의 기능을 활용하여 빠른 로딩 속도와 우수한 SEO를 보장합니다.

## � 최신 업데이트 (Recent Updates)

-   **UI 개선 (UI Refinements)**:
    -   **헤더 스타일링**: `Collections` 및 `주요 프로젝트 사례` 텍스트에 노란색 강조 라인(Gap 포함) 적용.
    -   **다크 모드 최적화**: 텍스트 가독성 및 노란색 포인트 컬러 일관성 강화.
    -   **이미지 업데이트**: 프로젝트 헤더 및 상세 페이지(비주얼 오버뷰) 이미지 추가.
-   **네비게이션 강화 (Enhanced Navigation)**:
    -   **섹션 링크 연결**: Landing 페이지의 서비스 카드(`What We Do`, 4개 카드) 클릭 시 `/services` 페이지의 해당 섹션으로 정확히 스크롤 이동.
    -   **프로세스 인터랙션**: `어떻게 일하나요?` 프로세스 아이템 클릭 시 관련 서비스 설명으로 이동.
    -   **페이지 내 스크롤**: `모든 프로젝트` 버튼 등 주요 CTA의 스크롤 이동 동작 개선.

## �🛠 기술 스택 (Tech Stack)

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| **Framework** | Next.js | `^16.1.1` | App Router 기반의 서버 사이드 렌더링 및 정적 생성 |
| **Library** | React | `^19.2.3` | 최신 리액트 기능 및 Hooks 활용 |
| **Language** | TypeScript | `~5.8.2` | 정적 타입 시스템을 통한 안정성 확보 |
| **Styling** | Tailwind CSS | `^4.1.18` | 유틸리티 퍼스트 CSS 프레임워크 |
| **Package Manager** | npm | - | 의존성 관리 |

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 사전 요구사항
-   Node.js (v18.17 이상 권장)
-   npm

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
│   ├── components/       # (예정) 재사용 가능한 UI 컴포넌트
│   ├── constants.tsx     # 프로젝트 상수 데이터 (서비스, 포트폴리오 등)
│   ├── globals.css       # 전역 스타일 및 Tailwind 설정
│   ├── layout.tsx        # 루트 레이아웃 (폰트, 메타데이터)
│   ├── page.tsx          # 메인 랜딩 페이지
│   └── types.ts          # TypeScript 타입 정의
├── docs/                 # 프로젝트 문서 (PRD, 기획서 등)
├── public/               # 정적 파일 (이미지, 폰트 등)
├── next.config.mjs       # Next.js 설정
├── package.json          # 의존성 및 스크립트 정보
└── tsconfig.json         # TypeScript 설정
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

## ⭐️ 코드 분석 및 개선 사항 (Code Analysis and Improvements)

**1. 모바일 환경 분석:**

*   **반응형 디자인:** 프로젝트는 Tailwind CSS의 반응형 프리픽스(`sm:`, `md:`, `lg:`)를 광범위하게 사용하여 반응형 디자인 원칙이 잘 적용되어 있음을 확인했습니다. 이는 모바일 환경에서 레이아웃이 유동적으로 변화하도록 설계되었음을 의미합니다.
*   **뷰포트 메타 태그:** 모바일 스케일링에 필수적인 `viewport` 메타 태그가 `app/layout.tsx`에 누락되어 있었습니다. 이 문제를 해결하기 위해 **`metadata` 객체에 `viewport: 'width=device-width, initial-scale=1'`를 추가하여 수정**했습니다.
*   **호버 효과:** 터치 기반 기기에서 작동하지 않는 `hover:` 효과가 다수 발견되었으나, 기능적인 문제보다는 사용자 경험에 미묘한 영향을 주는 수준으로 확인되었습니다. (예: 터치 시 효과가 없거나 유지됨)
*   **이미지 최적화:** `<Image />` 컴포넌트 대신 `<img>` 태그를 직접 사용하여 이미지 최적화 경고가 발생했습니다. 이는 LCP(Largest Contentful Paint)를 늦추고 대역폭을 증가시킬 수 있는 요인이었습니다. Next.js의 `<Image />` 컴포넌트는 이미지 지연 로딩, 반응형 크기 조절, 다양한 이미지 형식 지원 등 자동 최적화를 제공하므로 **모든 `<img>` 태그를 `<Image />` 컴포넌트로 교체**하여 해결했습니다.

**2. 린팅 및 코드 품질 분석:**

*   **Next.js `lint` 명령어 부재:** `package.json`에 `next lint` 스크립트가 있었으나, 프로젝트에 설치된 Next.js 버전(`16.1.1`)에는 `lint` 명령어가 존재하지 않았습니다. 이 버전은 Next.js의 표준 버전과는 다른 특이한 버전으로 판단됩니다.
*   **ESLint 수동 설정:** `next lint` 사용이 불가하여, `eslint` 및 `eslint-config-next`를 설치하고 `extends: ["next", "next/core-web-vitals"]`를 포함하는 `.eslintrc.json` 파일을 생성하여 **수동으로 린팅 환경을 구축**했습니다.
*   **린팅 경고 해결:**
    *   **폰트 로딩 경고:** Google Fonts(`Plus Jakarta Sans`, `Noto Sans KR`)는 **`next/font/google`을 사용하고 `font-display: 'optional'`을 적용하여 해결**했습니다. `Material Symbols Outlined` 아이콘 폰트의 경우 `next/font`의 직접적인 지원 제약으로 `<link>` 태그를 유지하되 `display=optional`을 추가했습니다. 이 경고는 현재 App Router의 특성상 허용 가능한 수준으로 판단됩니다.
    *   **`<img>` 태그 사용 경고:** `app/page.tsx`, `app/profile/page.tsx`, `app/project/[id]/page.tsx`, `app/projects/page.tsx`, `app/services/page.tsx` 파일에서 발견된 모든 `<img>` 태그를 `<Image />` 컴포넌트로 교체하여 **이미지 최적화 경고를 모두 해결**했습니다.
