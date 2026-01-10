# Coreline 프로젝트 보안 가이드라인

본 문서는 데이터 무결성을 보장하고 일반적인 웹 취약점으로부터 서비스를 보호하기 위해 본 프로젝트에 적용된 보안 조치와 모범 사례를 설명합니다.

## 1. 보안 헤더 (Security Headers)
`next.config.mjs`를 통해 브라우저 수준의 강력한 보안 헤더를 강제합니다.
- **Content-Security-Policy (CSP)**: 스크립트, 스타일, 폰트 등이 로드될 수 있는 출처를 제한하여 XSS 공격을 방지합니다.
- **X-Frame-Options**: `DENY`로 설정하여 클릭재킹(Clickjacking) 공격을 방지합니다.
- **X-Content-Type-Options**: `nosniff`로 설정하여 MIME 타입 스니핑을 방지합니다.
- **Referrer-Policy**: `strict-origin-when-cross-origin`으로 설정하여 외부 요청 시 정보 유출을 최소화합니다.

## 2. 환경 변수 (Environment Variables) 관리
- **`.env` 파일 배포 금지**: `.env.local`, `.env.production` 등은 절대 Git에 커밋하지 않습니다. (`.gitignore`에 포함됨)
- **접두사 사용**: 클라이언트 브라우저에 노출되어야 하는 변수에만 `NEXT_PUBLIC_` 접두사를 사용합니다. 민감한 키(API Secret, DB 접속 정보 등)에는 이 접두사를 **절대** 사용하지 마십시오.
- **검증**: 프로젝트 규모가 커지면 빌드 타임에 환경 변수 스키마를 검증하는 로직(예: Zod 사용) 도입을 권장합니다.

## 3. 입력값 검증 및 살균 (Validation & Sanitization)
- **클라이언트 측**: React 상태와 HTML5 기본 검증을 사용해 즉각적인 피드백을 제공합니다.
* **서버 측**: 사용자로부터 입력받은 모든 데이터는 처리 또는 저장 전 반드시 검증 및 살균 과정을 거쳐야 합니다.
- **XSS 방지**: Next.js는 JSX에서 렌더링되는 콘텐츠를 자동으로 이스케이프하지만, `dangerouslySetInnerHTML` 사용 시에는 특히 주의해야 하며 반드시 살균된 콘텐츠만 사용해야 합니다.

## 4. 종속성 (Dependency) 관리
- 정기적으로 `npm audit`을 실행하여 서드파티 패키지의 알려진 취약점을 점검합니다.
- `npm update` 또는 Dependabot과 같은 도구를 사용하여 패키지를 최신 보안 버전으로 유지합니다.

## 5. 배포 보안
- SSL/TLS 전송 계층 보안(HSTS)을 강제합니다.
- 배포 플랫폼(Vercel 등)에서 제공하는 보안 기능(Edge Config, Firewall 등)을 적극 활용합니다.
