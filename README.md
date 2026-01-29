# Coreline - Engineering First AI & Software Studio

<a href=https://web-coreline-public.vercel.app/><img width="175" height="67" alt="Coreline Logo" src="https://github.com/user-attachments/assets/4c3c9f3e-a214-4947-9436-d1b37fe2cc64" /><a/>

![Coreline](https://img.shields.io/badge/Coreline-Engineering%20Studio-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg?logo=fastapi&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-cyan.svg?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**Coreline**은 엔지니어링 중심의 AI 및 소프트웨어 스튜디오를 위한 포트폴리오 웹사이트입니다. 단순한 프로토타입을 넘어, 지속 가능하고 실제 프로덕션 환경에서 운영 가능한 고품질 솔루션을 제공하는 역량을 보여주기 위해 제작되었습니다.

> **현재 상태**: Next.js 프론트엔드와 Python FastAPI 백엔드가 결합된 하이브리드 아키텍처로 고도화되었습니다.

- **Demo Web Page**: [https://web-coreline-public.vercel.app/](https://web-coreline-public.vercel.app/)
- **Simple Fullstack Profile**: [https://github.com/coreline-ai/fullstack_profile_public](https://github.com/coreline-ai/fullstack_profile_public)

이 프로젝트는 최신 **Next.js 16 (App Router)** 와 **React 19**, 그리고 **Python (FastAPI)** 백엔드를 기반으로 구축되어 있습니다.

## ✨ 주요 기능 (Key Features)

- **하이브리드 아키텍처**: Next.js의 강력한 프론트엔드와 Python의 데이터 처리 능력을 결합했습니다.
- **서비스 쇼케이스**: AI 엔지니어링, 소프트웨어 개발, 아키텍처 설계 등 핵심 서비스를 카드 형태로 소개합니다.
- **프로젝트 포트폴리오**: 실제 사례를 통해 문제 해결 과정과 사용된 기술 스택을 상세히 보여줍니다.
- **개발 프로세스**: 문제 정의부터 운영까지, 체계적인 개발 방법론을 시각적으로 안내합니다.
- **반응형 디자인**: 데스크톱, 태블릿, 모바일 등 모든 기기에서 최적화된 화면을 제공합니다.
- **다크 모드 지원**: 사용자 선호에 따른 라이트/다크 모드 전환이 가능합니다.
- **보안 및 인증**: NextAuth와 연동된 보안 시스템을 갖추고 있습니다.

## 🚀 최신 업데이트 (Recent Updates)

### ⚡️ 시스템 고도화 (2026.01)

- **백엔드 통합**: Python(Serverless Function 호환) 백엔드가 `api/` 디렉토리에 통합되었습니다.
- **의존성 관리**: `concurrently`를 사용하여 프론트엔드와 백엔드를 동시에 개발할 수 있는 환경을 구축했습니다.
- **데이터베이스 연동**: Alembic 및 SQLAlchemy(추정)를 활용한 마이그레이션 스크립트가 포함되었습니다.
- **문서화 지원**: Markdown 렌더링을 위한 `react-markdown`, `rehype-raw` 등이 추가되어 풍부한 컨텐츠 표시가 가능합니다.
- **스타일링**: Tailwind CSS v4 최신 버전을 적용하여 성능과 DX를 개선했습니다.

## 🛠 기술 스택 (Tech Stack)

| 분류              | 기술         | 버전      | 설명                                              |
| ----------------- | ------------ | --------- | ------------------------------------------------- |
| **프레임워크**    | Next.js      | `^16.1.1` | App Router 기반의 서버 사이드 렌더링 및 정적 생성 |
| **프론트엔드**    | React        | `^19.2.3` | 최신 리액트 기능 및 Hooks 활용                    |
| **언어 (FE)**     | TypeScript   | `^5.9.3`  | 정적 타입 시스템을 통한 안정성 확보               |
| **언어 (BE)**     | Python       | `3.x`     | API 및 데이터 처리                                |
| **스타일링**      | Tailwind CSS | `^4.1.18` | 유틸리티 퍼스트 CSS 프레임워크                    |
| **패키지 매니저** | npm / pip    | -         | 의존성 관리                                       |

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요. Python 백엔드 설정이 포함되어 있습니다.

### 사전 요구사항

- Node.js (v18.17 이상 권장)
- Python 3.11 이상
- npm

### 설치 및 실행

1.  **저장소 클론**

    ```bash
    git clone https://github.com/coreline-ai/web_coreline_public.git
    cd web_coreline_public
    ```

2.  **프론트엔드 의존성 설치**

    ```bash
    npm install
    ```

3.  **백엔드 가상환경 설정 (선택 사항이지만 권장)**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Mac/Linux
    # venv\Scripts\activate   # Windows
    ```

4.  **백엔드 의존성 설치**

    ```bash
    pip install -r api/requirements.txt
    ```

5.  **개발 서버 실행 (통합 실행)**

    이 명령어는 프론트엔드(Next.js)와 백엔드(FastAPI)를 동시에 실행합니다.

    ```bash
    npm run dev
    ```

    - 프론트엔드: `http://localhost:3000`
    - 백엔드 API: `http://localhost:8000`

6.  **프로덕션 빌드 & 실행**
    ```bash
    npm run build
    npm run start
    ```

## 📂 폴더 구조 (Folder Structure)

```bash
/
├── api/                  # Python 백엔드 (FastAPI)
│   ├── index.py          # 엔트리 포인트
│   └── ...
├── app/                  # (구) 레거시 App 폴더 (확인 필요) 혹은 src/app 참조
├── src/                  # 메인 애플리케이션 소스
│   └── app/              # Next.js App Router
│       ├── components/   # UI 컴포넌트
│       ├── api/          # Next.js API Routes (Proxy 등)
│       ├── layout.tsx    # Root Layout & Theme Provider
│       ├── page.tsx      # 메인 페이지
│       └── ...
├── scripts/              # 유틸리티 및 마이그레이션 스크립트
├── public/               # 정적 파일 (로고, 아이콘 등)
├── docs/                 # 프로젝트 문서
├── next.config.mjs       # Next.js 설정
├── package.json          # Node.js 의존성 정보
├── requirements.txt      # Python 의존성 정보 (루트 혹은 api/ 내)
└── tailwind.config.ts    # Tailwind CSS 설정
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
