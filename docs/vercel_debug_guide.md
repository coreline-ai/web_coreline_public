# Vercel 404 Error: Debugging & Analysis Report

현재 상황: 로컬 빌드(`npm run build`)는 모든 페이지를 정상적으로 생성하지만, Vercel 배포 시 "Ready" 상태임에도 불구하고 모든 경로에서 404 에러가 발생하고 있습니다. 이는 Next.js 엔진이 Vercel 환경에서 비정상적으로 동작하거나, 빌드 결과물이 Vercel의 기대와 다를 때 발생합니다.

## 1. 예상되는 근본 원인 (Hypothesis)

1.  **빌드 결과물 누락 (Build Output Issue)**: Vercel 빌드 로그에서 `/` (루트) 경로가 리스트에 보이지 않는다면, `next build`가 특정 이유로 성공했음에도 결과 파일(`index.html` 또는 람다 함수)을 생성하지 않은 것입니다.
2.  **경로 대소문자 문제 (Case Sensitivity)**: Git은 대소문자를 구분하지 않도록 설정되어 있을 수 있지만, Vercel(Linux 환경)은 `app/page.tsx`와 `app/Page.tsx`를 엄격히 구분합니다.
3.  **Vercel 프로젝트 설정 오류**: 'Root Directory' 설정이 `.`가 아니거나, 'Framework Preset'이 Next.js가 아닌 다른 것으로 설정되어 있을 가능성이 있습니다.

## 2. 권장하는 디버깅 단계 (User Action Required)

가장 확실한 진단을 위해 Vercel 대시보드에서 다음을 확인해 주세요.

### Step 2.1: 빌드 로그 정밀 확인
Vercel 대시보드 -> Deployments -> 최근 배포 클릭 -> **Build Logs** 확인
- `Route (app)` 섹션에 `/` 또는 `/index`가 정확히 리스트업 되어 있는지 확인해 주세요.
- 만약 리스트에 없다면, 빌드 스크립트(`next build`)가 파일 시스템을 제대로 읽지 못한 것입니다.

### Step 2.2: Vercel 프로젝트 설정(Settings) 확인
- **Framework Preset**: `Next.js`로 되어 있는지 확인.
- **Root Directory**: 비어있거나 `./`로 되어 있는지 확인. (엉뚱한 폴더로 지정되어 있으면 `public/robots.txt`만 보이고 실제 앱은 404가 날 수 있습니다.)
- **Node.js Version**: 로컬과 동일한 버전(예: 18.x 또는 20.x)인지 확인.

### Step 2.3: 실행 로그(Runtime Logs) 확인
Vercel 대시보드 -> **Logs** 탭
- 404 응답이 올 때, Vercel 내부에서 발생한 다른 에러(예: "Cannot find module...", "Prisma error...")가 찍히는지 확인해 주세요.

---

## 3. 실험해볼 수 있는 추가 코드 수정 (Current Status)

현재 제가 `v7`까지 업데이트하며 적용한 사항들입니다:
- **`pages/api/_metadata.js` 추가**: Vercel 내부 트리거 오류 방지 (Option 1 적용).
- **Next.js 15.1.4 고정**: 안정적인 버전으로 강제 다운그레이드.
- **Root Page 서버 컴포넌트화**: 클라이언트 사이드 초기화 이슈 배제.

### 제안: `vercel.json` 강제 라우팅 설정 (Option 2)
만약 계속해서 root를 못 찾는다면, `vercel.json`을 통해 강제로 Next.js 핸들러를 지정할 수 있습니다.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
*(주의: 이 방법은 Next.js가 자체적으로 라우팅을 못할 때 사용하는 최후의 수단입니다.)*

**현재 Vercel 빌드 로그의 캡처본이나, "Settings -> General" 스크린샷을 공유해주시면 더 정확한 분석이 가능합니다!**
