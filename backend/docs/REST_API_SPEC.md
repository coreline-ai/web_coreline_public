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

### 2.1. Boards (게시판)

#### `GET /api/boards`
*   **설명:** 접근 가능한 모든 게시판의 목록을 조회합니다. (사용자 권한에 따라 '관리자 전용' 게시판은 필터링됨)
*   **인증:** 선택 (비로그인 시 공개 게시판만, 로그인 시 권한에 맞는 게시판 목록)
*   **성공 응답 (`200 OK`):**
    ```json
    [
      {
        "id": 1,
        "name": "자유 게시판",
        "slug": "free-board"
      },
      {
        "id": 2,
        "name": "공지사항",
        "slug": "notice"
      }
    ]
    ```

#### `GET /api/boards/{slug}`
*   **설명:** 특정 게시판의 정보와 해당 게시판의 게시글 목록을 페이지네이션하여 조회합니다.
*   **인증:** 게시판 속성에 따라 필요.
*   **URL 파라미터:** `slug` (string, required): 게시판 슬러그.
*   **쿼리 파라미터:**
    *   `page` (int, optional, default: 1): 조회할 페이지 번호.
    *   `category_id` (int, optional): 필터링할 카테고리 ID.
    *   `keyword` (string, optional): 검색어.
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "board": {
        "id": 1,
        "name": "자유 게시판",
        "slug": "free-board"
      },
      "posts": [
        {
          "id": 101,
          "title": "첫 번째 게시글",
          "author": { "id": 1, "nickname": "John Doe" },
          "created_at": "2026-01-10T10:00:00Z",
          "view_count": 123,
          "like_count": 10
        }
      ],
      "pagination": {
        "current_page": 1,
        "total_pages": 15,
        "total_items": 150
      }
    }
    ```

---
### 2.2. Posts (게시글)

#### `POST /api/posts`
*   **설명:** 새로운 게시글을 작성합니다.
*   **인증:** 필수.
*   **요청 본문:**
    ```json
    {
      "title": "새로운 글 제목",
      "content": "이것은 마크다운 형식의 **내용**입니다.",
      "board_id": 1,
      "category_id": 3,
      "filename": "uploads/image.jpg"
    }
    ```
*   **성공 응답 (`201 Created`):**
    ```json
    {
      "id": 102,
      "title": "새로운 글 제목",
      "content": "이것은 마크다운 형식의 **내용**입니다.",
      "author": { "id": 1, "nickname": "John Doe" },
      "created_at": "2026-01-10T11:00:00Z"
    }
    ```

#### `GET /api/posts/{post_id}`
*   **설명:** 특정 게시글의 상세 내용을 조회합니다.
*   **인증:** 게시판 속성에 따라 필요.
*   **URL 파라미터:** `post_id` (int, required): 게시글 ID.
*   **성공 응답 (`200 OK`):** (게시글 상세 정보 포함)

#### `PUT /api/posts/{post_id}`
*   **설명:** 기존 게시글을 수정합니다. (작성자 본인 또는 관리자만 가능)
*   **인증:** 필수 (권한 검사).
*   **URL 파라미터:** `post_id` (int, required): 게시글 ID.
*   **요청 본문:** (수정할 필드만 포함)
*   **성공 응답 (`200 OK`):** (수정된 게시글 정보)

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
      "author": { "id": 2, "nickname": "Jane Smith" },
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
      "contentType": "image/png"
    }
    ```
*   **성공 응답 (`200 OK`):**
    ```json
    {
      "uploadUrl": "https://<your-s3-bucket>.s3.amazonaws.com/...?AWSAccessKeyId=...",
      "fileUrl": "https://<your-s3-bucket>.s3.amazonaws.com/<final-file-key>"
    }
    ```

---
### 2.6. Notifications (알림)

#### `GET /api/notifications`
*   **설명:** 현재 로그인한 사용자의 읽지 않은 알림 목록을 조회합니다.
*   **인증:** 필수.
*   **쿼리 파라미터:** `limit` (int, optional, default: 10)
*   **성공 응답 (`200 OK`):**
    ```json
    [
      {
        "id": 301,
        "type": "COMMENT",
        "post": {
          "id": 101,
          "title": "첫 번째 게시글"
        },
        "message": "'Jane Smith'님이 댓글을 남겼습니다.",
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
