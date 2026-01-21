# 데이터베이스 스키마 명세: Spectrum

## 1. 개요

이 문서는 'Spectrum' 애플리케이션의 데이터베이스 스키마를 정의합니다. NextAuth.js와의 연동 및 Vercel 서버리스 PostgreSQL 환경을 고려하여 설계되었습니다.

## 2. NextAuth.js 연동 테이블

NextAuth.js는 사용자 인증 및 세션 관리를 위해 다음과 같은 기본 테이블들을 생성합니다. 기존 `User` 모델의 커스텀 필드들은 NextAuth.js의 `users` 테이블에 통합되거나 필요에 따라 확장됩니다.

---

### `users` 테이블
*NextAuth.js의 핵심 사용자 테이블. `app/models.py`의 `User` 모델 필드 중 일부가 통합 및 확장됨.*

| 컬럼명        | 데이터 타입          | 제약 조건                     | 설명                                |
| :------------ | :----------------- | :---------------------------- | :---------------------------------- |
| `id`          | `UUID`             | `PRIMARY KEY`                 | 사용자 고유 식별자                  |
| `name`        | `VARCHAR(255)`     | `NULLABLE`                    | 표시 이름 (NextAuth.js 기본)        |
| `email`       | `VARCHAR(255)`     | `UNIQUE`, `NOT NULL`          | 사용자 이메일                       |
| `emailVerified` | `TIMESTAMP WITH TIME ZONE`         | `NULLABLE`                    | 이메일 인증 시간                    |
| `image`       | `VARCHAR(255)`     | `NULLABLE`                    | 프로필 이미지 URL (NextAuth.js 기본) |
| `username`    | `VARCHAR(80)`      | `UNIQUE`, `NOT NULL`          | 사용자 계정명                       |
| `password`    | `VARCHAR(200)`     | `NULLABLE`                    | 해싱된 비밀번호. `credentials` provider 사용 시 `NOT NULL`. |
| `nickname`    | `VARCHAR(80)`      | `UNIQUE`, `NOT NULL`          | 사용자 닉네임                       |
| `is_admin`    | `BOOLEAN`          | `NOT NULL`, `DEFAULT FALSE`   | 관리자 권한 여부                    |
| `is_banned`   | `BOOLEAN`          | `NOT NULL`, `DEFAULT FALSE`   | 사용자 차단 여부                    |
| `login_count` | `INTEGER`          | `NOT NULL`, `DEFAULT 0`       | 총 로그인 횟수                      |
| `last_login_at` | `TIMESTAMP WITH TIME ZONE`         | `NULLABLE`                    | 마지막 로그인 시간                  |

**인덱스:** `email`, `username`, `nickname`

---

### `accounts` 테이블
*사용자와 연결된 소셜/OAuth 계정 정보. NextAuth.js에서 관리.*

| 컬럼명             | 데이터 타입      | 제약 조건                 | 설명                           |
| :----------------- | :--------------- | :------------------------ | :----------------------------- |
| `id`               | `UUID`            | `PRIMARY KEY`             | 계정 고유 식별자               |
| `userId`           | `UUID`            | `FOREIGN KEY (users.id)`  | 사용자와의 연결               |
| `type`             | `VARCHAR(255)`   | `NOT NULL`                | OAuth, Email, Credentials 등  |
| `provider`         | `VARCHAR(255)`   | `NOT NULL`                | 제공자 (google, github 등)      |
| `providerAccountId` | `VARCHAR(255)`   | `NOT NULL`                | 제공자 내 계정 ID              |
| `refresh_token`    | `TEXT`           | `NULLABLE`                | 갱신 토큰                      |
| `access_token`     | `TEXT`           | `NULLABLE`                | 접근 토큰                      |
| `expires_at`       | `INTEGER`        | `NULLABLE`                | 토큰 만료 시간 (Unix timestamp) |
| `token_type`       | `VARCHAR(255)`   | `NULLABLE`                | 토큰 타입 (Bearer 등)          |
| `scope`            | `VARCHAR(255)`   | `NULLABLE`                | 토큰 스코프                    |
| `id_token`         | `TEXT`           | `NULLABLE`                | ID 토큰                        |
| `session_state`    | `VARCHAR(255)`   | `NULLABLE`                | 세션 상태                      |

**제약 조건:** `UNIQUE(provider, providerAccountId)`
**인덱스:** `userId`

---

### `sessions` 테이블
*사용자 세션 정보. NextAuth.js에서 관리.*

| 컬럼명         | 데이터 타입      | 제약 조건                 | 설명                     |
| :------------- | :--------------- | :------------------------ | :----------------------- |
| `id`           | `UUID`            | `PRIMARY KEY`             | 세션 고유 식별자         |
| `userId`       | `UUID`            | `FOREIGN KEY (users.id)`  | 사용자와의 연결          |
| `expires`      | `TIMESTAMP WITH TIME ZONE`       | `NOT NULL`                | 세션 만료 시간           |
| `sessionToken` | `VARCHAR(255)`   | `UNIQUE`, `NOT NULL`      | 세션 토큰                |

**인덱스:** `sessionToken`, `userId`

---

### `verification_tokens` 테이블
*이메일 인증 등 검증 토큰 정보. NextAuth.js에서 관리.*

| 컬럼명         | 데이터 타입      | 제약 조건                 | 설명              |
| :------------- | :--------------- | :------------------------ | :---------------- |
| `identifier`   | `VARCHAR(255)`   | `NOT NULL`                | 사용자 식별자     |
| `token`        | `VARCHAR(255)`   | `UNIQUE`, `NOT NULL`      | 검증 토큰         |
| `expires`      | `TIMESTAMP WITH TIME ZONE`       | `NOT NULL`                | 토큰 만료 시간    |

**제약 조건:** `UNIQUE(identifier, token)`

---

## 3. 애플리케이션 핵심 테이블

---

### `boards` 테이블
*독립된 게시판 정보.*

| 컬럼명         | 데이터 타입       | 제약 조건                   | 설명               |
| :------------- | :---------------- | :-------------------------- | :----------------- |
| `id`           | `SERIAL`          | `PRIMARY KEY`               | 게시판 고유 식별자 |
| `name`         | `VARCHAR(50)`     | `UNIQUE`, `NOT NULL`        | 게시판 이름        |
| `slug`         | `VARCHAR(50)`     | `UNIQUE`, `NOT NULL`        | 게시판 슬러그 (URL용) |
| `description`  | `TEXT`            | `NULLABLE`                  | 게시판 설명        |
| `access_level` | `VARCHAR(20)` (or PostgreSQL `ENUM`) | `NOT NULL` | 접근 권한 (`PUBLIC`, `AUTHENTICATED`, `ADMIN`) |
| `created_at`   | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | 생성 일시          |
| `updated_at`   | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL` (DB 트리거로 자동 업데이트) | 마지막 수정 일시   |

**인덱스:** `slug`

---

### `board_categories` 테이블
*게시판 내 게시글 분류용 카테고리 정보 (게시판별 전용).*

| 컬럼명         | 데이터 타입       | 제약 조건                               | 설명               |
| :------------- | :---------------- | :-------------------------------------- | :----------------- |
| `id`           | `SERIAL`          | `PRIMARY KEY`                           | 카테고리 고유 식별자 |
| `board_id`     | `INTEGER`         | `NOT NULL`, `FOREIGN KEY (boards.id)`   | 게시판 ID          |
| `name`         | `VARCHAR(50)`     | `NOT NULL`                              | 카테고리 이름      |
| `created_at`   | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | 생성 일시          |
| `updated_at`   | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL` (DB 트리거로 자동 업데이트) | 마지막 수정 일시   |

**제약 조건:** `UNIQUE(board_id, name)`

**인덱스:** `board_id`, `(board_id, name)`

**운영 규칙:** `posts.category_id`는 `NOT NULL`이므로, 각 게시판은 최소 1개 이상의 카테고리를 가져야 하며(기본 카테고리 포함), 게시글 생성 시 선택된 `category_id`가 지정된 `board_id`의 카테고리인지(=`board_categories.board_id`) 애플리케이션 레벨에서 검증해야 합니다.

---

### `posts` 테이블
*게시글 정보.*

| 컬럼명        | 데이터 타입       | 제약 조건                               | 설명                     |
| :------------ | :---------------- | :-------------------------------------- | :----------------------- |
| `id`          | `SERIAL`          | `PRIMARY KEY`                           | 게시글 고유 식별자       |
| `title`       | `VARCHAR(120)`    | `NOT NULL`                              | 게시글 제목              |
| `content`     | `TEXT`            | `NOT NULL`                              | 게시글 내용 (마크다운)   |
| `user_id`     | `UUID`            | `NOT NULL`, `FOREIGN KEY (users.id)`    | 작성자 ID                |
| `board_id`    | `INTEGER`         | `NOT NULL`, `FOREIGN KEY (boards.id)`   | 게시판 ID                |
| `category_id` | `INTEGER`         | `NOT NULL`, `FOREIGN KEY (board_categories.id)` | 카테고리 ID (게시판별) |
| `file_url`    | `VARCHAR(300)`    | `NULLABLE`                              | 첨부파일 최종 URL (S3/R2) |
| `is_notice`   | `BOOLEAN`         | `NOT NULL`, `DEFAULT FALSE`             | 공지글 여부              |
| `view_count`  | `INTEGER`         | `NOT NULL`, `DEFAULT 0`                 | 조회수                   |
| `created_at`  | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | 생성 일시                |
| `updated_at`  | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL` (DB 트리거로 자동 업데이트) | 마지막 수정 일시         |

**인덱스:** `user_id`, `board_id`, `category_id`, `created_at`

**권장 인덱스(목록 조회 최적화):** `(board_id, is_notice, created_at)`

---

### `comments` 테이블
*댓글 정보.*

| 컬럼명       | 데이터 타입       | 제약 조건                               | 설명             |
| :----------- | :---------------- | :-------------------------------------- | :--------------- |
| `id`         | `SERIAL`          | `PRIMARY KEY`                           | 댓글 고유 식별자 |
| `content`    | `TEXT`            | `NOT NULL`                              | 댓글 내용        |
| `user_id`    | `UUID`            | `NOT NULL`, `FOREIGN KEY (users.id)`    | 작성자 ID        |
| `post_id`    | `INTEGER`         | `NOT NULL`, `FOREIGN KEY (posts.id)`    | 게시글 ID        |
| `created_at` | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | 생성 일시        |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL` (DB 트리거로 자동 업데이트) | 마지막 수정 일시 |

**인덱스:** `user_id`, `post_id`, `created_at`

---

### `post_likes` 테이블
*사용자의 게시글 '좋아요' 정보를 저장하는 중간 테이블.*

| 컬럼명       | 데이터 타입       | 제약 조건                               | 설명           |
| :----------- | :---------------- | :-------------------------------------- | :------------- |
| `user_id`    | `UUID`            | `PRIMARY KEY`, `FOREIGN KEY (users.id)` | 사용자 ID      |
| `post_id`    | `INTEGER`         | `PRIMARY KEY`, `FOREIGN KEY (posts.id)` | 게시글 ID      |
| `created_at` | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | '좋아요' 생성 일시 |

**제약 조건:** `UNIQUE(user_id, post_id)`

---

### `notifications` 테이블
*사용자에게 전달될 알림 정보.*

| 컬럼명            | 데이터 타입       | 제약 조건                               | 설명                         |
| :---------------- | :---------------- | :-------------------------------------- | :--------------------------- |
| `id`              | `SERIAL`          | `PRIMARY KEY`                           | 알림 고유 식별자             |
| `user_id`         | `UUID`            | `NOT NULL`, `FOREIGN KEY (users.id)`    | 알림을 받는 사용자 ID        |
| `post_id`         | `INTEGER`         | `NOT NULL`, `FOREIGN KEY (posts.id)`    | 관련 게시글 ID               |
| `comment_id`      | `INTEGER`         | `NULLABLE`, `FOREIGN KEY (comments.id)` | 관련 댓글 ID (댓글 알림인 경우) |
| `type`            | `VARCHAR(50)`     | `NOT NULL`                              | 알림 타입 (예: 'COMMENT', 'MENTION', 'ADMIN_MESSAGE') |
| `actor_user_id`   | `UUID`            | `NULLABLE`, `FOREIGN KEY (users.id)`    | 알림 유발 사용자 ID (예: 댓글 작성자) |
| `is_read`         | `BOOLEAN`         | `NOT NULL`, `DEFAULT FALSE`             | 알림 읽음 여부               |
| `created_at`      | `TIMESTAMP WITH TIME ZONE` (or `TIMESTAMP`) | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | 생성 일시                    |

**인덱스:** `user_id`, `is_read`, `created_at`
