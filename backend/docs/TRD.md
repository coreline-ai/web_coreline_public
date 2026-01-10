# 기술 요구사항 명세서 (TRD): Spectrum

## 1. 시스템 아키텍처

Spectrum은 Vercel에 최적화된 Jamstack 아키텍처를 따릅니다. 이 구조는 프론트엔드와 백엔드를 명확히 분리하여 독립적인 개발, 배포, 확장을 가능하게 합니다.

![System Architecture Diagram](https://i.imgur.com/gYw8Cxl.png)

*   **Client (Next.js App):** 사용자의 브라우저에서 실행되는 React 기반의 싱글 페이지 애플리케이션(SPA)입니다. Vercel의 글로벌 CDN을 통해 정적 에셋(HTML, CSS, JS)이 사용자에게 매우 빠르게 전달됩니다.
*   **API Layer (Python Serverless Functions):** 백엔드 로직은 Python(FastAPI)으로 작성되며, Vercel의 서버리스 환경에서 실행됩니다. 각 API 엔드포인트는 독립적인 함수로 배포되어, 사용량이 많아지면 Vercel이 자동으로 스케일링합니다.
*   **Data Layer (Serverless PostgreSQL):** 데이터는 Neon, Supabase 등 서버리스 Postgres 데이터베이스에 저장됩니다. API 계층을 통해서만 데이터베이스에 접근합니다.
*   **Authentication (NextAuth.js):** 인증 로직은 Next.js 애플리케이션에서 NextAuth.js 라이브러리를 통해 처리됩니다. 로그인 성공 시, 클라이언트는 세션 토큰(JWT)을 발급받아 API 요청 시 사용합니다.
*   **File Storage (AWS S3 / R2):** 이미지, 첨부파일 등은 AWS S3와 같은 외부 오브젝트 스토리지에 저장됩니다. Vercel 서버는 파일을 직접 저장하지 않습니다 (Stateless).

## 2. 프론트엔드 (Next.js)

### 2.1. 디렉토리 구조 (App Router 기준)

```
/
├── app/                      # Next.js App Router
│   ├── (auth)/               # 인증 관련 페이지 그룹
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/               # 메인 레이아웃 적용 페이지 그룹
│   │   ├── board/[slug]/page.tsx
│   │   ├── board/[slug]/[post_id]/page.tsx
│   │   └── mypage/page.tsx
│   ├── api/auth/[...nextauth]/route.ts # NextAuth.js API
│   └── layout.tsx
├── components/               # 재사용 가능한 UI 컴포넌트
│   ├── ui/                   # shadcn/ui 컴포넌트
│   └── common/
├── lib/                      # 공통 헬퍼 함수, 타입 정의
└── hooks/                    # 커스텀 React Hooks
```

### 2.2. 데이터 페칭 (Data Fetching)

*   **초기 데이터 로딩:** Next.js의 **서버 컴포넌트(RSC)**를 최대한 활용하여 페이지 초기 렌더링 시 필요한 데이터를 서버에서 미리 가져옵니다. 이는 SEO에 유리하며, 초기 로딩 성능을 극대화합니다.
    *   *예시:* 게시글 목록, 게시글 상세 내용 등
*   **동적 데이터 로딩:** 클라이언트 사이드에서의 상호작용(검색, 필터링, 좋아요 등)은 **SWR** 또는 **React Query**를 사용하여 비동기적으로 API를 호출하고, 클라이언트 캐시를 관리하여 UX를 향상시킵니다.

### 2.3. 상태 관리 (State Management)

*   전역적으로 필요한 상태(예: 로그인한 사용자 정보)는 **React Context** 또는 **Zustand**를 사용하여 관리합니다. 복잡한 상태 관리가 필요하기 전까지는 가벼운 라이브러리를 우선적으로 사용합니다.

## 3. 백엔드 API (Python Serverless Functions)

### 3.1. 디렉토리 구조 및 라우팅

Vercel은 `/api` 디렉토리 내의 Python 파일을 자동으로 서버리스 함수로 변환하고 라우팅합니다.

```
/
├── api/                      # 모든 백엔드 API 코드
│   ├── _lib/                 # API 내부 공용 모듈 (db, models 등)
│   ├── index.py              # GET /api
│   ├── boards/index.py       # GET, POST /api/boards
│   ├── boards/[board_id].py  # GET, PUT, DELETE /api/boards/{board_id}
│   ├── posts/index.py        # GET, POST /api/posts
│   └── ...
└── vercel.json               # Vercel 설정 파일 (필요시)
```

### 3.2. API 명세 (FastAPI 및 Pydantic 활용)

*   **Framework:** **FastAPI**를 사용하여 API를 구축합니다. 타입 힌팅 기반의 빠른 성능과 자동 데이터 검증(Validation) 기능을 제공합니다.
*   **Data Validation:** Pydantic 모델을 사용하여 요청(Request) 및 응답(Response)의 데이터 형식을 정의하고, FastAPI가 이를 자동으로 검증/문서화하도록 합니다.
*   **주요 API 엔드포인트:**
    *   `POST /api/auth/token`: (NextAuth.js에서 사용)
    *   `GET /api/boards`: 모든 게시판 목록 조회
    *   `GET /api/boards/{slug}`: 특정 게시판 정보 및 게시글 목록 조회
    *   `GET /api/posts/{post_id}`: 특정 게시글 상세 정보 조회
    *   `POST /api/posts`: 새 게시글 작성
    *   `POST /api/posts/{post_id}/like`: 게시글 좋아요/취소
    *   `POST /api/posts/{post_id}/comments`: 댓글 작성
    *   `POST /api/files/signed-url`: 파일 업로드를 위한 Pre-signed URL 생성

### 3.3. 인증 및 권한 부여

*   NextAuth.js를 통해 클라이언트가 발급받은 JWT를 모든 API 요청의 `Authorization` 헤더에 담아 전송합니다.
*   FastAPI의 **Dependency Injection** 시스템을 사용하여, 각 엔드포인트가 요구하는 인증 상태(로그인 여부, 관리자 여부)를 검증하는 미들웨어 함수를 작성하고 적용합니다.

## 4. 데이터베이스 스키마

PRD의 요구사항을 충족하기 위해 다음과 같은 기본 테이블 구조를 설계합니다. (NextAuth.js는 `users`, `accounts`, `sessions` 등 자체 테이블을 자동으로 생성합니다.)

*   **`users`**: 사용자 정보 (NextAuth.js와 연동)
*   **`boards`**: 게시판 정보 (`id`, `name`, `slug`, `access_level`)
*   **`categories`**: 카테고리 정보
*   **`board_category_association`**: 게시판-카테고리 M:N 관계
*   **`posts`**: 게시글 정보 (`id`, `title`, `content`, `user_id`, `board_id`, `category_id`, `is_notice`, `view_count`)
*   **`comments`**: 댓글 정보
*   **`post_likes`**: 좋아요 정보 (M:N 관계)
*   **`notifications`**: 알림 정보

## 5. 파일 업로드 아키텍처

Vercel의 Stateless 특성으로 인해, 파일은 다음과 같은 절차로 외부 스토리지(S3)에 업로드합니다.

1.  **클라이언트:** 사용자가 업로드할 파일(이미지 등)을 선택합니다.
2.  **클라이언트 → 백엔드:** 파일명, 파일 타입 등의 정보를 백엔드의 `POST /api/files/signed-url` 엔드포인트로 전송하여 "업로드 전용 URL"을 요청합니다.
3.  **백엔드 → S3:** AWS SDK를 사용하여 S3에 제한된 시간(예: 5분) 동안만 유효한 **Pre-signed URL** 생성을 요청합니다.
4.  **백엔드 → 클라이언트:** 생성된 Pre-signed URL을 클라이언트에게 응답으로 전달합니다.
5.  **클라이언트 → S3:** 클라이언트는 받은 Pre-signed URL을 목적지로 하여 파일을 S3에 **직접 업로드**합니다. (백엔드 서버를 거치지 않음)
6.  **클라이언트 → 백엔드:** 업로드 성공 후, S3에 저장된 최종 파일 URL(또는 Key)을 백엔드의 게시글 생성/수정 API로 전송하여 데이터베이스에 파일 경로를 저장합니다.

## 6. 배포 및 CI/CD

*   **배포 워크플로우:** GitHub의 `main` 브랜치에 코드가 병합(merge)되면, Vercel이 이를 감지하여 자동으로 빌드 및 배포를 시작합니다.
*   **환경 변수 관리:** `DATABASE_URL`, `NEXTAUTH_SECRET`, `AWS_S3_ACCESS_KEY` 등 모든 민감 정보는 Vercel 프로젝트의 "Settings > Environment Variables" 메뉴에서 안전하게 관리합니다. 소스 코드에는 절대 포함되지 않습니다.
*   **모니터링:** Vercel 대시보드를 통해 실시간 로그, 함수 실행 시간, 에러율 등 애플리케이션의 상태를 모니터링합니다.
