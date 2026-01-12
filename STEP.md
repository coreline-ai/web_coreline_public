# Spectrum Integration Roadmap (STEP.md)

이 문서는 **Coreline** 프론트엔드와 **Spectrum** 백엔드 인프라를 통합하기 위한 단계별 개발 계획입니다. 각 세션은 독립적인 마일스톤으로 구성되며, 단계별로 완료 여부를 체크할 수 있습니다.

---

## 📅 세션 1: 인프라 및 인증 시스템 구축 (Infrastructure & Auth)
**목표**: NextAuth.js 기반의 보안 인증 체계 구축 및 개발 환경 설정

### 🛠 테스크
- [ ] **NextAuth.js 설치 및 설정**: `next-auth` 의존성 추가 및 `app/api/auth/[...nextauth]/route.ts` 구현.
- [ ] **환경 변수 구성**: `.env.local` 파일에 `NEXTAUTH_SECRET`, `GITHUB_ID`, `GOOGLE_ID` 등 필수 변수 정의.
- [ ] **Credentials Provider 연동**: 백엔드 `POST /api/auth/token` 및 `POST /api/auth/register`를 NextAuth Credentials Provider에서 호출하도록 연결.
- [ ] **로그인/회원가입 UI 연결**: 기존 `/login`, `/signup` 페이지를 NextAuth `signIn()` 및 회원가입 플로우와 연동.
- [ ] **인증 미들웨어 설정**: 보호된 경로(게시글 작성 등)에 대한 접근 제어 로직 구현.
- [ ] **API 호출 인증 처리**: 세션의 JWT를 이용해 API 호출 시 `Authorization: Bearer <JWT>` 헤더를 자동 첨부하는 fetch 래퍼/클라이언트 유틸 구현.

### ✅ 검증 테스트 케이스
- [ ] **TC 1.1**: 이메일/비밀번호로 로그인 성공 시 세션 쿠키가 생성되고 메인 페이지로 리다이렉트 되는가?
- [ ] **TC 1.2**: 로그아웃 버튼 클릭 시 세션이 파기되고 보호된 경로 접근 시 로그인 페이지로 튕기는가?
- [ ] **TC 1.3**: 유효하지 않은 계정 정보 입력 시 적절한 에러 메시지가 표시되는가?
- [ ] **TC 1.4**: 로그인 후 인증이 필요한 API 호출 시 `Authorization` 헤더가 포함되어 정상 응답을 받는가?

---

## 📅 세션 2: 백엔드 API 서버 구축 (Backend API)
**목표**: FastAPI 기반의 서버리스 백엔드 구축 및 데이터베이스 연동

### 🛠 테스크
- [ ] **Python/FastAPI 환경 설정**: `requirements.txt` 정의 및 Vercel Python Runtime 설정.
- [ ] **Neon/Supabase 데이터베이스 연동**: PostgreSQL 스키마 생성 및 ORM 설정. **(users UUID, boards/posts/comments SERIAL; `TIMESTAMP WITH TIME ZONE` 권장)**
- [ ] **Auth API 구현**: `POST /api/auth/token`, `POST /api/auth/register`
- [ ] **게시판(Boards) API 구현**
    - [ ] `GET /api/boards` (목록: `access_level`/`description` 포함)
    - [ ] `POST /api/boards` (관리자: 생성)
    - [ ] `GET /api/boards/{slug}` (상세+목록: `categories` + `notices` + paginated `posts`)
    - [ ] `PUT /api/boards/{slug}`, `DELETE /api/boards/{slug}` (관리자)
- [ ] **카테고리(Categories) API 구현 (게시판별)**
    - [ ] `GET /api/boards/{slug}/categories`
    - [ ] `POST /api/boards/{slug}/categories` (관리자)
    - [ ] `PUT /api/boards/{slug}/categories/{category_id}`, `DELETE /api/boards/{slug}/categories/{category_id}` (관리자)
- [ ] **게시글(Posts) API 구현**
    - [ ] `POST /api/posts` (작성: `category_id` 필수, `file_url` 선택, `is_notice`는 관리자만)
    - [ ] `GET /api/posts/{post_id}` (상세 조회 시 `view_count` 자동 증가)
    - [ ] `PUT /api/posts/{post_id}`, `DELETE /api/posts/{post_id}` (권한 검사)
- [ ] **댓글/좋아요 API 구현**
    - [ ] `POST /api/posts/{post_id}/comments`, `DELETE /api/comments/{comment_id}`
    - [ ] `POST /api/posts/{post_id}/like` (토글)
- [ ] **파일 업로드 API 구현**: `POST /api/files/signed-url` (요청: `filename`, `content_type` / 응답: `upload_url`, `file_url`)
- [ ] **알림 API 구현**: `GET /api/notifications`(unread only), `POST /api/notifications/{notification_id}/read` (응답은 구조화 필드: `type`/`actor`/`post`/`comment_id`)
- [ ] **관리자 API 구현**: `GET /api/admin/users`, `PATCH /api/admin/users/{user_id}` (관리자)
- [ ] **API 문서화**: FastAPI의 Swagger UI(`docs`)를 통한 엔드포인트 테스트 및 검증.

### ✅ 검증 테스트 케이스
- [ ] **TC 2.1**: `/api/docs` (Swagger) 접속 시 정의된 모든 엔드포인트가 정상적으로 노출되는가?
- [ ] **TC 2.2**: `GET /api/boards` 호출 시 게시판 목록이 `access_level`/`description` 포함 JSON으로 반환되는가?
- [ ] **TC 2.3**: 권한이 없는 사용자가 `POST /api/posts` 호출 시 `401 Unauthorized` 또는 `403 Forbidden`을 반환하는가?
- [ ] **TC 2.4**: `GET /api/boards/{slug}`에서 `notices`는 항상 포함되고, `pagination.total_items`는 공지 제외 posts 기준으로 계산되는가?
- [ ] **TC 2.5**: `GET /api/posts/{post_id}` 호출 시 `view_count`가 1 증가하는가?

---

## 📅 세션 3: 프론트엔드 데이터 연동 (Frontend Integration)
**목표**: Mock 데이터를 실제 API 데이터로 교체 및 동적 렌더링 구현

### 🛠 테스크
- [ ] **SWR/React Query 도입**: 효율적인 클라이언트 사이드 데이터 페칭 및 캐싱 전략 수립.
- [ ] **BoardTemplate 연동**: `BoardTemplate.tsx` 내의 Mock 데이터를 백엔드 API에서 가져온 데이터로 교체.
    - [ ] `GET /api/boards/{slug}` 응답의 `notices`(항상 표시) + `posts`(페이징) 구조에 맞게 UI 분리.
    - [ ] 게시글 작성자 이름 `post.author.nickname`으로 접근하도록 수정.
    - [ ] 게시글 카테고리 표시를 `post.category.name` 기준으로 연결.
    - [ ] `created_at` (ISO 문자열) 날짜를 사용자 친화적인 형식으로 변환.
- [ ] **CommunitySection 연동**: 메인 페이지의 커뮤니티 섹션 탭 필터링을 백엔드 쿼리에 연결.
- [ ] **카테고리 필터링 구현**: `GET /api/boards/{slug}/categories`로 카테고리 목록 로드 후, `category_id` 쿼리로 필터링.
- [ ] **페이지네이션 구현**: 서버 사이드 쿼리 파라미터를 이용한 게시글 목록 페이징 처리.
- [ ] **검색 기능 활성화**: 제목/내용 기반의 실시간 API 검색 연동.

### ✅ 검증 테스트 케이스
- [ ] **TC 3.1**: 게시판 페이지 진입 시 로딩 스피너가 표시되고, 로딩 후 실제 DB 데이터가 테이블에 출력되는가?
- [ ] **TC 3.2**: 검색창에 키워드 입력 시 결과가 필터링되며, '전체', '뉴스' 등 탭 전환 시 해당 데이터만 표시되는가?
- [ ] **TC 3.3**: 페이지 번호 클릭 시 해당 페이지의 데이터로 리스트가 갱신되는가?
- [ ] **TC 3.4**: 어떤 페이지를 보더라도 공지글(`notices`)이 상단에 반복 노출되는가?

---

## 📅 세션 4: 상호작용 및 파일 스토리지 (Engagement & Storage)
**목표**: 좋아요, 댓글, 알림 시스템 및 이미지 업로드 기능 완성

### 🛠 테스크
- [ ] **댓글(Comments) 시스템**: 게시글 상세 페이지 내 댓글 작성 및 실시간 목록 업데이트.
- [ ] **좋아요(Likes) 토글**: `Optimistic UI`를 활용한 새로고침 없는 좋아요 수 반영.
- [ ] **이미지 업로드 (S3/R2)**: `POST /api/files/signed-url`로 `upload_url` 발급 → 직접 업로드 → 게시글 생성/수정 시 `file_url` 저장.
- [ ] **알림(Notifications)**: `GET /api/notifications`(unread) + read 처리 연동. (클라이언트는 `type`/`actor`/`post`/`comment_id`로 문구 렌더링)
- [ ] **게시글 수정/삭제**: 권한 검사(본인 확인)가 포함된 관리 기능 완성.
- [ ] **관리자 기능(필수 API 우선)**: 사용자 차단/관리자 권한 부여(`PATCH /api/admin/users/{user_id}`), 게시판/카테고리 관리 API 연결.

### ✅ 검증 테스트 케이스
- [ ] **TC 4.1**: 댓글 작성 후 새로고침 없이 즉시 목록에 추가되며, DB에 정상 저장되는가?
- [ ] **TC 4.2**: 이미지 첨부 시 S3로 직접 업로드되고, 게시글 저장 후 상세 페이지에서 해당 이미지가 잘 보이는가?
- [ ] **TC 4.3**: 좋아요 버튼 클릭 시 서버 응답 전 UI가 즉시 업데이트되며(Optimistic), 반복 클릭 시 토글이 정상 작동하는가?
- [ ] **TC 4.4**: 알림 목록은 unread만 노출되고, 읽음 처리 후 목록에서 제거되는가?

---

## 📅 세션 5: 품질 검증 및 최적화 (Polish & Verification)
**목표**: 전체 시스템 통합 테스트, 보안 검증 및 배포

### 🛠 테스크
- [ ] **입력값 검증(Sanitization)**: XSS 방지를 위한 Markdown 렌더링 보안 강화 및 API 입력 검증.
- [ ] **성능 최적화**: Next.js의 Incremental Static Regeneration (ISR) 적용을 통한 데이터 최신성 유지.
- [ ] **반응형 테스트**: 모바일 및 태블릿 환경에서의 최종 레이아웃 점검.
- [ ] **배포 환경 점검**: Vercel Environment Variables 설정 및 DB 커넥션 풀 최적화.
- [ ] **최종 회고 및 문서 업데이트**: `README.md` 및 `PRD` 최종 상태 업데이트.

### ✅ 검증 테스트 케이스
- [ ] **TC 5.1**: 게시글 내용에 `<script>` 태그 입력 시 스크립트로 실행되지 않고 텍스트로 안전하게 렌더링되는가?
- [ ] **TC 5.2**: Lighthouse 검사 시 성능, 접근성, SEO 점수가 권장 수준 이상으로 나오는가?
- [ ] **TC 5.3**: Vercel 배포 후 도메인 접속 시 모든 API 연동 및 인증 기능이 로컬과 동일하게 작동하는가?

---

> [!IMPORTANT]  
> 모든 작업은 로컬 환경에서 충분히 검토된 후에 진행하며, 각 세션 완료 시 사용자 확인을 거칩니다.
