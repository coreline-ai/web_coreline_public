# 🚀 Spectrum: Parallel Development Plan (Skill-Based)

이 문서는 프로젝트 내 정의된 **전문 스킬(`/.agent/skills`)**을 기반으로 한 병렬 개발 리드맵입니다. 각 작업 그룹은 독립적인 개발이 가능합니다.

---

## 🛠️ Track 1: Infra & Foundation
**주요 스킬:** @infra_foundation
- [x] **[INFRA-01]** Vercel & DB (`DATABASE_URL`, `JWT_SECRET`) 인프라 초기화 (로컬 DB 설치 및 .env 설정 완료)
- [x] **[INFRA-02]** DB 스키마 배포 및 `updated_at` 자동화 트리거 설정 (DB 초기화 완료)
- [x] **[INFRA-03]** FastAPI `api/_lib/` 공통 라이브러리 및 DB 연결 풀 구축

## 🔐 Track 2: Auth & Security
**주요 스킬:** @auth_security
- [x] **[AUTH-01]** NextAuth.js 어댑터용 사용자 테이블 구현
- [x] **[AUTH-02]** `POST /api/auth/register` (비밀번호 해싱) API 구현
- [x] **[AUTH-03]** `POST /api/auth/token` (Credentials Provider 연동)
- [x] **[AUTH-04]** API 권한 관리 디펜던시 (`admin_required` 등) 및 RBAC 적용

## 📦 Track 3: Core Domain API
**주요 스킬:** @core_domain
- [x] **[CORE-01]** 게시판 및 카테고리 CRUD API (Slug 기반) 구현
- [x] **[CORE-02]** 게시글 작성/수정 및 카테고리 검증 로직 구현
- [x] **[CORE-03]** 페이지네이션 및 공지사항 상단 고정 목록 조회 API
- [x] **[CORE-04]** 댓글(Comments) CRUD 및 게시글별 댓글 조회 로직

## ⚡ Track 4: Real-time & Media
**주요 스킬:** @realtime_media
- [x] **[MEDIA-01]** S3/R2 Pre-signed URL 발급 API 및 파일 관리 로직 (boto3 연동)
- [/] **[REAL-01]** 실시간 브로드캐스팅(Supabase Realtime) 연동 설계 (DB 트리거 기반 설계 완료)
- [x] **[REAL-02]** 알림(Notification) 생성 및 조회/읽음 처리 API 구현
- [x] **[INTER-01]** '좋아요' 토글 및 실시간 카운트 동기화 로직

## 🛡️ Track 5: Admin & Integration
**주요 스킬:** @admin_agent
- [x] **[ADMIN-01]** 관리자 전용 유저 관리 API (목록, 검색, Banned 처리)
- [x] **[ADMIN-02]** 전체 콘텐츠(게시글/댓글) 관리 및 강제 제재 API (DELETE API 통합)
- [ ] **[INT-01]** 프론트엔드 - 백엔드 API 타입(TypeScript Interface) 동기화
- [ ] **[INT-02]** Vercel Preview/Production 배포 파이프라인 최종 점검

---

## 📅 도메인별 스킬 상세 정의 (Reference)
스킬별 세부 가이드라인은 다음 경로에서 확인할 수 있습니다:
- [infra_foundation](file:///Users/hwanchoi/projects/web_new_coreline/.agent/skills/infra_foundation/SKILL.md)
- [auth_security](file:///Users/hwanchoi/projects/web_new_coreline/.agent/skills/auth_security/SKILL.md)
- [core_domain](file:///Users/hwanchoi/projects/web_new_coreline/.agent/skills/core_domain/SKILL.md)
- [realtime_media](file:///Users/hwanchoi/projects/web_new_coreline/.agent/skills/realtime_media/SKILL.md)
