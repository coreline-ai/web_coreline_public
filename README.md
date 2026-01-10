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

### ⚡️ Latest Changes (2026.01.10)
- **Component Architecture**: Refactored monolithic `page.tsx` into 8 modular components for better maintainability.
- **Brand Identity**: Deployed new Logo System (`logo.svg`) across Header, Footer, and Navigation for consistent branding.
- **Accessibility (a11y)**: Enhanced Screen Reader support with descriptive `alt` text for all project images.
- **Performance & Health**: Replaced all `<img>` tags with `next/image`, optimized loading, and verified zero runtime errors.
- **Stability**: Secured build pipeline by locking ESLint dependencies to known stable versions (v8).
- **Maintenance & Type Safety**:
    - Enforced strict `tsc` checks (removed `ignoreBuildErrors`).
    - Standardized Header text to Title Case ("Coreline") across all pages.
    - Streamlined navigation by removing "Sign Up" from sub-pages.
    - Enhanced Dark Mode UX with signature yellow key interactions (Login hover).

### 🎨 Previous Updates
- **UI Refinements**: Added signature yellow styles to Collections and Headlines.
- **Navigation**: Enhanced smooth scrolling and deep linking for Services.
- **Dark Mode**: Optimized color contrast and visual hierarchy.

## 🛠 기술 스택 (Tech Stack)

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
│   ├── components/       # UI 컴포넌트
│   │   └── home/         # 메인 페이지 섹션별 컴포넌트 (Hero, Services, etc.)
│   ├── constants.tsx     # 프로젝트 데이터 및 상수
│   ├── globals.css       # Tailwind v4 & 커스텀 스타일
│   ├── layout.tsx        # Root Layout & Theme Provider
│   ├── page.tsx          # 메인 페이지 (Composition Root)
│   └── types.ts          # TypeScript 정의
├── docs/                 # 프로젝트 문서
├── public/               # 정적 파일
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
