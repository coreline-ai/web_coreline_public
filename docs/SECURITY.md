# Coreline 프로젝트 보안 가이드라인 (Security Policy)

본 문서는 **Coreline** 프로젝트(Next.js Frontend + Python FastAPI Backend)의 데이터 무결성을 보장하고, 사용자 정보를 보호하며, 일반적인 웹 취약점으로부터 서비스를 방어하기 위한 보안 표준 및 모범 사례를 기술합니다.

## 1. 시스템 아키텍처 보안 (Architecture Security)

이 프로젝트는 하이브리드 아키텍처를 채택하고 있으며, 각 계층에서 다음과 같은 보안 원칙을 준수합니다.

### Frontend (Next.js)
- **보안 헤더**: `next.config.mjs`를 통해 CSP(Content-Security-Policy), HSTS, X-Frame-Options 등 브라우저 보안 헤더를 강제합니다.
- **XSS 방지**: React의 기본 이스케이프 기능을 활용하며, `dangerouslySetInnerHTML` 사용을 지양합니다. 마크다운 렌더링 시에는 `rehype-sanitize`를 통해 스크립트 주입을 차단합니다.
- **환경 변수**: 클라이언트(`NEXT_PUBLIC_`)와 서버 사이드 환경 변수를 엄격히 구분하여 민감 정보 유출을 방지합니다.

### Backend (Python FastAPI)
- **API 보안**: 모든 민감한 API 엔드포인트는 인증 미들웨어를 통해 보호됩니다.
- **입력 값 검증 (Input Validation)**: Pydantic 모델을 사용하여 모든 요청 데이터의 타입과 포맷을 엄격하게 검증합니다.
- **SQL Injection 방지**: SQLAlchemy ORM을 사용하여 쿼리 파라미터 바인딩을 자동화, SQL 인젝션 공격을 원천 차단합니다.
- **CORS 정책**: 신뢰할 수 있는 도메인(Vercel 배포 도메인 및 로컬호스트)에서의 요청만 허용하도록 설정합니다.

## 2. 인증 및 권한 관리 (Authentication & Authorization)

### 인증 프로세스 (Authentication)
- **NextAuth.js**: 프론트엔드 인증 관리는 NextAuth.js를 사용하여 세션 보안을 유지합니다.
- **JWT (JSON Web Tokens)**: 백엔드와의 통신은 JWT를 사용하며, 만료 시간(Expiration Time)이 설정된 토큰만을 유효한 요청으로 처리합니다.
- **비밀번호 관리**: 모든 비밀번호는 평문으로 저장되지 않으며, 강력한 단방향 해시 알고리즘(`bcrypt` 또는 `argon2`)을 사용하여 암호화 저장됩니다.

### 권한 제어 (RBAC - Role Based Access Control)
- **ADMIN vs USER**: 사용자는 명시적인 역할(Role)을 부여받습니다.
- **보호된 리소스**: 관리자 전용 API(게시판 생성, 사용자 관리 등)는 미들웨어 레벨에서 `is_admin` 권한을 검사합니다.

## 3. 데이터 보안 및 개인정보 (Data Privacy)

- **데이터베이스 접속**: DB 접속 정보는 환경 변수(`DATABASE_URL`)로만 관리되며, 코드베이스에 하드코딩되지 않습니다.
- **최소 권한 원칙**: 애플리케이션은 기능 수행에 필요한 최소한의 DB 권한만을 가집니다.
- **HTTPS 강제**: 모든 프로덕션 트래픽은 SSL/TLS를 통해 암호화되어 전송됩니다.

## 4. 시큐어 코딩 가이드라인 (DevOps & Management)

- **종속성 감사**: 정기적으로 `npm audit` 및 `pip audit`을 실행하여 알려진 취약점을 가진 라이브러리를 식별하고 업데이트합니다.
- **Git 보안**: `.env` 파일, API Key, Secret Key 등은 `.gitignore`에 포함하여 버전 관리 시스템에 업로드되지 않도록 합니다.
- **에러 처리**: 프로덕션 환경에서는 스택 트레이스(Stack Trace) 등 내부 시스템 정보를 노출하지 않고 정제된 에러 메시지만 반환합니다.

## 5. 취약점 신고 (Reporting Vulnerabilities)

보안 취약점을 발견하신 경우, 공개적인 이슈 트래커 대신 아래 연락처로 제보해 주시기 바랍니다. 신속하게 검토 후 조치하겠습니다.

- **이메일**: security@coreline.ai (예시)
