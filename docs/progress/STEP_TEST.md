# Spectrum API Verification Plan (STEP_TEST.md)

> [!IMPORTANT]
> 이 문서는 `REST_API_SPEC.md`를 기준으로 실제 구현 상태를 검증하기 위한 QA 체크리스트입니다.
> 모든 테스트 케이스는 **자동화 스크립트**(`tests/run_qa.py`)를 통해 검증되며, 결과가 기록됩니다.

## 1. Authentication (인증)

| TC ID | Description | Method | Endpoint | Expected | Result |
|-------|-------------|--------|----------|----------|--------|
| **AUTH-01** | 신규 사용자 회원가입 | `POST` | `/api/auth/register` | `201 Created`, Access Token 반환 | [x] |
| **AUTH-02** | 중복 이메일/닉네임 가입 시도 | `POST` | `/api/auth/register` | `400 Bad Request` | [x] |
| **AUTH-03** | 로그인 (Valid Credentials) | `POST` | `/api/auth/token` | `200 OK`, Access Token 반환 | [x] |
| **AUTH-04** | 로그인 (Invalid Password) | `POST` | `/api/auth/token` | `401 Unauthorized` | [x] |
| **AUTH-05** | 보호된 리소스 접근 (No Token) | `POST` | `/api/posts` | `401 Unauthorized` | [x] |

## 2. Boards (게시판) & Categories

| TC ID | Description | Method | Endpoint | Expected | Result |
|-------|-------------|--------|----------|----------|--------|
| **BRD-01** | 게시판 목록 조회 | `GET` | `/api/boards` | `200 OK`, List of boards | [x] |
| **BRD-02** | 게시판 생성 (Admin) | `POST` | `/api/boards` | `201 Created` | [x] |
| **BRD-03** | 게시판 생성 (User) | `POST` | `/api/boards` | `403 Forbidden` | [x] |
| **BRD-04** | 특정 게시판 상세 조회 | `GET` | `/api/boards/{slug}` | `200 OK`, Board+Categories+Posts | [x] |
| **BRD-05** | 존재하지 않는 게시판 조회 | `GET` | `/api/boards/{invalid}` | `404 Not Found` | [x] |
| **CAT-01** | 카테고리 목록 조회 | `GET` | `/api/boards/{slug}/categories` | `200 OK`, List of categories | [x] |
| **CAT-02** | 카테고리 생성 (Admin) | `POST` | `/api/boards/{slug}/categories` | `201 Created` | [x] |

## 3. Posts (게시글)

| TC ID | Description | Method | Endpoint | Expected | Result |
|-------|-------------|--------|----------|----------|--------|
| **PST-01** | 게시글 작성 (Valid) | `POST` | `/api/posts` | `201 Created` | [x] |
| **PST-02** | 게시글 작성 (Invalid Board) | `POST` | `/api/posts` | `404 Not Found` (Slug lookup) or `422` | [x] |
| **PST-03** | 게시글 작성 (Invalid Category) | `POST` | `/api/posts` | `400 Bad Request` | [x] |
| **PST-04** | 게시글 상세 조회 | `GET` | `/api/posts/{post_id}` | `200 OK`, Includes Author/Board/Category | [x] |
| **PST-05** | 조회수 증가 확인 | `GET` | `/api/posts/{post_id}` | `view_count` increases | [x] |
| **PST-06** | 게시글 삭제 (Author) | `DELETE` | `/api/posts/{post_id}` | `204 No Content` | [x] |
| **PST-07** | 게시글 삭제 (Other User) | `DELETE` | `/api/posts/{post_id}` | `403 Forbidden` | [x] |

## 4. Interactions (댓글/좋아요)

| TC ID | Description | Method | Endpoint | Expected | Result |
|-------|-------------|--------|----------|----------|--------|
| **INT-01** | 댓글 작성 | `POST` | `/api/posts/{id}/comments` | `201 Created` | [x] |
| **INT-02** | 댓글 삭제 (Author) | `DELETE` | `/api/comments/{id}` | `204 No Content` | [x] |
| **INT-03** | 좋아요 토글 (On) | `POST` | `/api/posts/{id}/like` | `200 OK`, `liked: true`, count +1 | [x] |
| **INT-04** | 좋아요 토글 (Off) | `POST` | `/api/posts/{id}/like` | `200 OK`, `liked: false`, count -1 | [x] |

## 5. Notifications (알림)

| TC ID | Description | Method | Endpoint | Expected | Result |
|-------|-------------|--------|----------|----------|--------|
| **NOT-01** | 댓글 작성 시 알림 생성 확인 | `GET` | `/api/notifications` | List includes new notification | [x] |
| **NOT-02** | 알림 읽음 처리 | `POST` | `/api/notifications/{id}/read` | `200 OK`, `is_read: true` | [x] |
| **NOT-03** | 읽은 알림 목록 제외 확인 | `GET` | `/api/notifications` | Read notification excluded | [x] |

## 6. Admin Functions

| TC ID | Description | Method | Endpoint | Expected | Result |
|-------|-------------|--------|----------|----------|--------|
| **ADM-01** | 사용자 목록 조회 (Admin) | `GET` | `/api/admin/users` | `200 OK` | [x] |
| **ADM-02** | 사용자 목록 조회 (User) | `GET` | `/api/admin/users` | `403 Forbidden` | [x] |
