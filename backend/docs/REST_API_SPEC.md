# REST API 명세서: Spectrum

## 1. 기본 정책

### 1.1. Base URL
모든 API의 기본 URL은 다음과 같습니다.
```
/api
```

### 1.2. 인증 (Authentication)
*   인증이 필요한 모든 API는 `Authorization` 헤더에 `Bearer` 타입의 JWT(JSON Web Token)를 포함하여 요청해야 합니다. 이 토큰은 NextAuth.js를 통해 클라이언트에서 발급 및 관리됩니다.
*   **헤더 형식:** `Authorization: Bearer <YOUR_JWT>`
*   (Credentials 로그인) JWT 발급은 `POST /api/auth/token`을 통해 수행합니다. (예: NextAuth.js Credentials Provider에서 호출)

### 1.3. 표준 응답 형식
*   **성공:**
    *   **코드:** `200 OK`, `201 Created`
    *   **본문:** 요청에 대한 결과 데이터 (JSON)
*   **실패:**
    *   **코드:** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`
    *   **본문:**
        ```json
        {
          "detail": "에러 발생 원인에 대한 설명"
        }
        ```

---
## 2. API 엔드포인트 명세

### 2.0. Auth (인증)

#### `POST /api/auth/token`
*   **설명:** 이메일/유저명 + 비밀번호 기반 로그인 시 JWT를 발급합니다. (NextAuth.js Credentials Provider 연동용)
*   **인증:** 불필요.
*   **요청 본문:**
    ```json
    {
      "username_or_email": "name@example.com",
      "password": "********"
    }
    ```
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "access_token": "<JWT>",
      "token_type": "Bearer",
      "user": {
        "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f",
        "nickname": "Jane Smith",
        "is_admin": false
      }
    }
    ```
*   **실패 응답 (`401 Unauthorized`):**
    ```json
    { "detail": "Invalid credentials" }
    ```

#### `POST /api/auth/register`
*   **설명:** 이메일/비밀번호 기반 회원가입을 수행하고 JWT를 발급합니다.
*   **인증:** 불필요.
*   **정책:** 시스템 최초 가입자는 `is_admin = true`로 생성됩니다.
*   **요청 본문:**
    ```json
    {
      "username": "jdoe123",
      "email": "name@example.com",
      "nickname": "Jane Smith",
      "password": "********"
    }
    ```
*   **성공 응답 (`201 Created`):**
    ```json
    {
      "access_token": "<JWT>",
      "token_type": "Bearer",
      "user": {
        "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f",
        "nickname": "Jane Smith",
        "is_admin": false
      }
    }
    ```

### 2.1. Boards (게시판)

#### `GET /api/boards`
*   **설명:** 접근 가능한 모든 게시판의 목록을 조회합니다. (사용자 권한에 따라 '관리자 전용' 게시판은 필터링됨)
*   **인증:** 선택 (비로그인 시 `PUBLIC` 게시판만, 로그인 시 `PUBLIC` + `AUTHENTICATED`, 관리자 계정은 `ADMIN` 포함)
*   **성공 응답 (`200 OK`):**
    ```json
    [
      {
        "id": 1,
        "name": "자유 게시판",
        "slug": "free-board",
        "description": "자유롭게 이야기하는 공간",
        "access_level": "PUBLIC"
      },
      {
        "id": 2,
        "name": "공지사항",
        "slug": "notice",
        "description": "중요 공지 및 업데이트",
        "access_level": "AUTHENTICATED"
      }
    ]
    ```

#### `GET /api/boards/{slug}`
*   **설명:** 특정 게시판의 정보와 해당 게시판의 게시글 목록을 페이지네이션하여 조회합니다.
*   **인증:** 게시판의 `access_level`에 따라 필요. (`PUBLIC`: 불필요, `AUTHENTICATED`: 로그인 필요, `ADMIN`: 관리자 필요)
*   **URL 파라미터:** `slug` (string, required): 게시판 슬러그.
*   **페이지네이션 정책:** 공지글(`is_notice = true`)은 모든 페이지 요청에서 `notices`로 함께 반환되며, `posts`/`pagination`은 `is_notice = false` 게시글만 기준으로 합니다.
*   **필터 정책:** `category_id`/`keyword` 필터는 `posts`에만 적용되며, `notices`는 필터와 무관하게 항상 반환됩니다.
*   **정렬 정책:** `notices`와 `posts`는 각각 최신순(`created_at DESC`)으로 정렬합니다.
*   **카운트 정책:** `pagination.total_items`/`total_pages`는 `posts`(공지 제외) 기준으로 계산합니다.
*   **쿼리 파라미터:**
    *   `page` (int, optional, default: 1): 조회할 페이지 번호.
    *   `category_id` (int, optional): 필터링할 카테고리 ID (게시판별, `GET /api/boards/{slug}/categories`에서 조회).
    *   `keyword` (string, optional): 검색어.
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "board": {
        "id": 1,
        "name": "자유 게시판",
        "slug": "free-board",
        "description": "자유롭게 이야기하는 공간",
        "access_level": "PUBLIC"
      },
      "categories": [
        { "id": 1, "name": "일반" },
        { "id": 2, "name": "질문" }
      ],
      "notices": [
        {
          "id": 101,
          "title": "공지: 이용 안내",
          "is_notice": true,
          "category": { "id": 1, "name": "일반" },
          "author": { "id": "11111111-1111-1111-1111-111111111111", "nickname": "John Doe" },
          "created_at": "2026-01-10T10:00:00Z",
          "view_count": 123,
          "like_count": 10
        }
      ],
      "posts": [
        {
          "id": 102,
          "title": "첫 번째 게시글",
          "is_notice": false,
          "category": { "id": 2, "name": "질문" },
          "author": { "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f", "nickname": "Jane Smith" },
          "created_at": "2026-01-10T09:00:00Z",
          "view_count": 45,
          "like_count": 3
        }
      ],
      "pagination": {
        "current_page": 1,
        "total_pages": 15,
        "total_items": 150
      }
    }
    ```

#### `GET /api/boards/{slug}/categories`
*   **설명:** 특정 게시판에 연결된 카테고리 목록을 조회합니다.
*   **인증:** 게시판의 `access_level`에 따라 필요. (`PUBLIC`: 불필요, `AUTHENTICATED`: 로그인 필요, `ADMIN`: 관리자 필요)
*   **URL 파라미터:** `slug` (string, required): 게시판 슬러그.
*   **성공 응답 (`200 OK`):**
    ```json
    [
      { "id": 1, "name": "일반" },
      { "id": 2, "name": "질문" }
    ]
    ```

#### `POST /api/boards`
*   **설명:** 게시판을 생성합니다.
*   **인증:** 필수 (관리자).
*   **요청 본문:**
    ```json
    {
      "name": "자유 게시판",
      "slug": "free-board",
      "description": "자유롭게 이야기하는 공간",
      "access_level": "PUBLIC"
    }
    ```
*   **성공 응답 (`201 Created`):**
    ```json
    {
      "id": 1,
      "name": "자유 게시판",
      "slug": "free-board",
      "description": "자유롭게 이야기하는 공간",
      "access_level": "PUBLIC"
    }
    ```

#### `PUT /api/boards/{slug}`
*   **설명:** 게시판 정보를 수정합니다.
*   **인증:** 필수 (관리자).
*   **URL 파라미터:** `slug` (string, required): 게시판 슬러그.
*   **요청 본문:** (수정할 필드만 포함)
*   **성공 응답 (`200 OK`):** (수정된 게시판 정보)

#### `DELETE /api/boards/{slug}`
*   **설명:** 게시판을 삭제합니다.
*   **인증:** 필수 (관리자).
*   **URL 파라미터:** `slug` (string, required): 게시판 슬러그.
*   **성공 응답 (`204 No Content`):**

#### `POST /api/boards/{slug}/categories`
*   **설명:** 게시판에 카테고리를 생성합니다.
*   **인증:** 필수 (관리자).
*   **URL 파라미터:** `slug` (string, required): 게시판 슬러그.
*   **요청 본문:**
    ```json
    { "name": "질문" }
    ```
*   **성공 응답 (`201 Created`):**
    ```json
    { "id": 2, "name": "질문" }
    ```

#### `PUT /api/boards/{slug}/categories/{category_id}`
*   **설명:** 게시판 카테고리 이름을 수정합니다.
*   **인증:** 필수 (관리자).
*   **URL 파라미터:** `slug` (string, required), `category_id` (int, required)
*   **요청 본문:**
    ```json
    { "name": "Q&A" }
    ```
*   **성공 응답 (`200 OK`):**
    ```json
    { "id": 2, "name": "Q&A" }
    ```

#### `DELETE /api/boards/{slug}/categories/{category_id}`
*   **설명:** 게시판 카테고리를 삭제합니다.
*   **인증:** 필수 (관리자).
*   **URL 파라미터:** `slug` (string, required), `category_id` (int, required)
*   **성공 응답 (`204 No Content`):**

---
### 2.2. Posts (게시글)

#### `POST /api/posts`
*   **설명:** 새로운 게시글을 작성합니다.
*   **인증:** 필수.
*   **요청 필드 규칙:**
    *   `category_id`는 **필수**이며, 지정한 `board_id`에 속한 카테고리(`board_categories.board_id`)여야 합니다.
    *   `is_notice`는 선택이며, 관리자만 `true`로 설정할 수 있습니다. (그 외에는 항상 `false`)
*   **요청 본문:**
    ```json
    {
      "title": "새로운 글 제목",
      "content": "이것은 마크다운 형식의 **내용**입니다.",
      "board_id": 1,
      "category_id": 2,
      "is_notice": false,
      "file_url": "https://<your-bucket>.<provider>.com/uploads/image.jpg"
    }
    ```
*   **성공 응답 (`201 Created`):**
    ```json
    {
      "id": 102,
      "title": "새로운 글 제목",
      "content": "이것은 마크다운 형식의 **내용**입니다.",
      "is_notice": false,
      "author": { "id": "11111111-1111-1111-1111-111111111111", "nickname": "John Doe" },
      "board_id": 1,
      "category_id": 2,
      "file_url": "https://<your-bucket>.<provider>.com/uploads/image.jpg",
      "created_at": "2026-01-10T11:00:00Z"
    }
    ```

#### `GET /api/posts/{post_id}`
*   **설명:** 특정 게시글의 상세 내용을 조회합니다.
*   **인증:** 게시판 속성에 따라 필요.
*   **URL 파라미터:** `post_id` (int, required): 게시글 ID.
*   **조회수 정책:** 본 엔드포인트 호출 시 서버는 `view_count`를 1 증가시킵니다.
*   **응답 필드:** `liked`는 인증된 사용자 요청인 경우에만 포함됩니다.
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "id": 101,
      "title": "첫 번째 게시글",
      "content": "이것은 마크다운 형식의 **내용**입니다.",
      "is_notice": false,
      "author": { "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f", "nickname": "Jane Smith" },
      "board": { "id": 1, "slug": "free-board", "name": "자유 게시판" },
      "category": { "id": 2, "name": "질문" },
      "file_url": "https://<your-bucket>.<provider>.com/uploads/image.jpg",
      "created_at": "2026-01-10T10:00:00Z",
      "updated_at": "2026-01-10T10:30:00Z",
      "view_count": 124,
      "like_count": 11,
      "liked": true
    }
    ```

#### `PUT /api/posts/{post_id}`
*   **설명:** 기존 게시글을 수정합니다. (작성자 본인 또는 관리자만 가능)
*   **인증:** 필수 (권한 검사).
*   **URL 파라미터:** `post_id` (int, required): 게시글 ID.
*   **요청 필드 규칙:**
    *   `category_id`를 수정하는 경우, 해당 게시글의 `board_id`에 속한 카테고리여야 합니다.
    *   `is_notice`를 수정하는 경우, 관리자만 가능합니다.
*   **요청 본문:** (수정할 필드만 포함)
    ```json
    {
      "title": "수정된 제목",
      "content": "수정된 본문",
      "category_id": 1,
      "is_notice": false,
      "file_url": "https://<your-bucket>.<provider>.com/uploads/updated.jpg"
    }
    ```
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "id": 101,
      "title": "수정된 제목",
      "content": "수정된 본문",
      "is_notice": false,
      "author": { "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f", "nickname": "Jane Smith" },
      "board": { "id": 1, "slug": "free-board", "name": "자유 게시판" },
      "category": { "id": 1, "name": "일반" },
      "file_url": "https://<your-bucket>.<provider>.com/uploads/updated.jpg",
      "created_at": "2026-01-10T10:00:00Z",
      "updated_at": "2026-01-10T11:00:00Z"
    }
    ```

#### `DELETE /api/posts/{post_id}`
*   **설명:** 게시글을 삭제합니다. (작성자 본인 또는 관리자만 가능)
*   **인증:** 필수 (권한 검사).
*   **URL 파라미터:** `post_id` (int, required): 게시글 ID.
*   **성공 응답 (`204 No Content`):**

---
### 2.3. Comments (댓글)

#### `POST /api/posts/{post_id}/comments`
*   **설명:** 특정 게시글에 새로운 댓글을 작성합니다.
*   **인증:** 필수.
*   **URL 파라미터:** `post_id` (int, required): 게시글 ID.
*   **요청 본문:**
    ```json
    {
      "content": "새로운 댓글입니다."
    }
    ```
*   **성공 응답 (`201 Created`):**
    ```json
    {
      "id": 201,
      "content": "새로운 댓글입니다.",
      "author": { "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f", "nickname": "Jane Smith" },
      "created_at": "2026-01-10T12:00:00Z"
    }
    ```

#### `DELETE /api/comments/{comment_id}`
*   **설명:** 댓글을 삭제합니다. (작성자 본인 또는 관리자만 가능)
*   **인증:** 필수 (권한 검사).
*   **URL 파라미터:** `comment_id` (int, required): 댓글 ID.
*   **성공 응답 (`204 No Content`):**

---
### 2.4. Interactions (상호작용)

#### `POST /api/posts/{post_id}/like`
*   **설명:** 특정 게시글의 '좋아요'를 누르거나 취소합니다 (토글).
*   **인증:** 필수.
*   **URL 파라미터:** `post_id` (int, required): 게시글 ID.
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "liked": true,
      "count": 11
    }
    ```

---
### 2.5. Files (파일)

#### `POST /api/files/signed-url`
*   **설명:** 파일 업로드를 위한 Pre-signed URL을 생성하여 반환합니다.
*   **인증:** 필수.
*   **요청 본문:**
    ```json
    {
      "filename": "my-awesome-image.png",
      "content_type": "image/png"
    }
    ```
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "upload_url": "https://<your-s3-bucket>.s3.amazonaws.com/...?AWSAccessKeyId=...",
      "file_url": "https://<your-s3-bucket>.s3.amazonaws.com/<final-file-key>"
    }
    ```

---
### 2.6. Notifications (알림)

#### `GET /api/notifications`
*   **설명:** 현재 로그인한 사용자의 읽지 않은 알림 목록을 조회합니다.
*   **인증:** 필수.
*   **쿼리 파라미터:** `limit` (int, optional, default: 10)
*   **기본 정책:** 본 엔드포인트는 기본적으로 `is_read = false` (unread) 알림만 반환합니다.
*   **응답 렌더링:** 클라이언트는 `type` 및 `actor`/`post`/`comment_id` 등의 구조화 필드를 기반으로 사용자에게 표시할 메시지를 렌더링합니다.
*   **성공 응답 (`200 OK`):**
    ```json
    [
      {
        "id": 301,
        "type": "COMMENT",
        "actor": { "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f", "nickname": "Jane Smith" },
        "post": {
          "id": 101,
          "title": "첫 번째 게시글"
        },
        "comment_id": 201,
        "is_read": false,
        "created_at": "2026-01-10T12:00:00Z"
      }
    ]
    ```

#### `POST /api/notifications/{notification_id}/read`
*   **설명:** 특정 알림을 '읽음' 상태로 변경합니다.
*   **인증:** 필수 (본인 알림만 가능).
*   **URL 파라미-터:** `notification_id` (int, required): 알림 ID.
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "id": 301,
      "is_read": true
    }
    ```

---
### 2.7. Admin (관리자)

#### `GET /api/admin/users`
*   **설명:** 사용자 목록을 조회합니다.
*   **인증:** 필수 (관리자).
*   **쿼리 파라미터:** `page` (int, optional, default: 1), `limit` (int, optional, default: 50)
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "items": [
        {
          "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f",
          "username": "jdoe123",
          "email": "name@example.com",
          "nickname": "Jane Smith",
          "is_admin": false,
          "is_banned": false,
          "login_count": 0,
          "last_login_at": null
        }
      ],
      "pagination": {
        "current_page": 1,
        "total_pages": 1,
        "total_items": 1
      }
    }
    ```

#### `PATCH /api/admin/users/{user_id}`
*   **설명:** 사용자 권한/상태를 변경합니다.
*   **인증:** 필수 (관리자).
*   **URL 파라미터:** `user_id` (UUID, required): 사용자 ID.
*   **요청 본문:** (수정할 필드만 포함)
    ```json
    {
      "is_admin": true,
      "is_banned": false
    }
    ```
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "id": "3b0f0a4c-7b6f-4c3a-9b8f-1b6c2a3d4e5f",
      "is_admin": true,
      "is_banned": false
    }
    ```
