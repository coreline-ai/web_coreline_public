# Coreline 디자인 시스템 가이드

본 문서는 **Coreline** 프로젝트의 디자인 언어를 정의하는 공식 가이드입니다. 개발자와 디자이너가 추측 없이 프로젝트의 독특한 "네오 브루탈리즘(Neo-Brutalist)" 및 "고대비(High-Contrast)" 미학을 일관되게 구현할 수 있도록 작성되었습니다.

---

## 1. 디자인 철학 (Design Philosophy)
**"대담함, 직관성, 프리미엄 (Bold, Direct, Premium)."**

Coreline의 디자인 시스템은 **네오 브루탈리즘(Neo-Brutalism)**을 기반으로 합니다. 미세한 그림자나 그라데이션을 배제하고 다음 요소들을 강조합니다:

*   **고대비 (High Contrast)**: 순수 블랙(`#000000`)과 화이트(`#FFFFFF`)의 극명한 대비.
*   **선명한 경계 (Hard Edges & Borders)**: 두껍고 뚜렷한 2px 테두리.
*   **하드 섀도우 (Hard Shadows)**: 블러(Blur)가 없는 견고하고 오프셋된 그림자.
*   **마이크로 인터랙션 (Micro-Interactions)**: 위치 이동(Translation)과 그림자 변화를 이용한 물리적인 조작감.

---

## 2. 글로벌 토큰 (Global Tokens)

### 2.1 색상 (Colors)
임팩트를 극대화하기 위해 색상 팔레트를 의도적으로 제한했습니다.

| 토큰 명 (Token Name) | Hex 값 | Tailwind 클래스 | 용도 |
| :--- | :--- | :--- | :--- |
| **Primary Black** | `#000000` | `bg-black`, `text-black` | 메인 배경, 텍스트, 테두리. |
| **Primary White** | `#FFFFFF` | `bg-white`, `text-white` | 카드 배경, 다크 모드 텍스트. |
| **Accent Yellow** | `#FFD600` | `bg-[#FFD600]` | 브랜딩, 주요 액션 버튼, 강조. |
| **Error Red** | `#EF4444` | `bg-red-500` | 에러 상태, 알림 배지. |

### 2.2 타이포그래피 (Typography)
현대적이고 기하학적인 명료함을 위해 이중 폰트 스택을 사용합니다.

*   **영문/숫자**: `Plus Jakarta Sans`
    *   굵기: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold).
*   **국문**: `Noto Sans KR`
    *   굵기: 300-900.

**CSS 변수 사용:**
```css
font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
```

---

## 3. UI 유틸리티 & 효과 (UI Utilities & Effects)

### 3.1 네오 섀도우 (Neo-Shadows)
그림자는 반드시 블러가 없는 **솔리드(Solid)** 형태의 순수 블랙이어야 합니다.

| 클래스 명 | CSS 사양 | 용도 |
| :--- | :--- | :--- |
| `.neo-shadow` | `6px 6px 0px 0px #000` | 표준 카드, 컨테이너. |
| `.neo-shadow-sm` | `3px 3px 0px 0px #000` | 작은 요소, 드롭다운. |
| `.neo-shadow-lg` | `10px 10px 0px 0px #000` | 히어로 섹션, 모달. |

### 3.2 인터랙션 (Interactions)
요소는 마치 물리적인 물체처럼 느껴져야 합니다. 클릭하거나 호버할 때 요소가 이동하고 그림자가 줄어드는 효과로 "높이감(Elevation)"의 변화를 표현합니다.

**표준 버튼 호버 효과:**
```css
.neo-shadow-hover:hover {
  box-shadow: 2px 2px 0px 0px #000; /* 그림자가 줄어듦 */
  transform: translate(4px, 4px);   /* 요소가 '아래로' 눌리는 느낌 */
}
```

**활성 상태 (Active State):**
*   **스케일**: 표준 버튼 클릭 시 `active:scale-95`를 적용하여 "눌림" 효과를 줍니다.

### 3.3 배경 텍스처 (Background Textures)
빈 공간에 기술적인 질감을 더하기 위해 도트 그리드(Dot Grid)를 사용합니다.
```css
.bg-grid {
  background-size: 40px 40px;
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
}
```

---

## 4. 컴포넌트 패턴 (Component Patterns)

### 4.1 버튼 (Buttons)
버튼은 주요 액션 스타일을 정의하는 핵심 요소입니다.

**기본 인터랙션 버튼:**
*   **테두리**: `border-2 border-black`
*   **배경**: `bg-white` (기본) 또는 `bg-black` (반전).
*   **그림자**: `shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`.
*   **호버**: `hover:translate-x-[1px] hover:translate-y-[1px]` (미세한 이동).

**예시 (Tailwind):**
```tsx
<button className="rounded-lg border-2 border-black bg-white px-4 py-2 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] active:scale-95 active:shadow-none">
  클릭하세요
</button>
```

### 4.2 카드 / 컨테이너 (Cards / Containers)
굵은 테두리를 사용하여 콘텐츠 영역을 명확히 구분합니다.

*   **모서리 반경**: `rounded-2xl` 또는 `rounded-lg`.
*   **테두리**: `border-4` 또는 `border-2`.
*   **배경**: `bg-white` (라이트 모드), `bg-black` (다크 모드).

### 4.3 헤더 / 내비게이션 (Header / Navigation)
*   **고정 (Sticky)**: `fixed top-0`.
*   **화단 테두리**: `border-b-2 border-black`.
*   **글래스모피즘 (다크 모드)**: `dark:bg-black/80 dark:backdrop-blur-md`.

---

## 5. 다크 모드 전략 (Dark Mode Strategy)
이 사이트는 강력한 다크 모드를 지원합니다.

*   **색상 반전**: 흰색 배경은 검은색으로, 검은색 텍스트는 흰색으로 변환됩니다.
*   **테두리**: 검은색 테두리는 반투명한 흰색(`border-white/20`)으로 변경됩니다.
*   **강조색**: 옐로우(`#FFD600`) 포인트 컬러는 그대로 유지되며, 활성 상태나 장식 요소로 자주 사용됩니다 (`dark:decoration-[#FFD600]`).

**매핑 테이블:**
| 라이트 모드 (Light Mode) | 다크 모드 (Dark Mode) |
| :--- | :--- |
| `bg-white` | `dark:bg-black` 또는 `dark:bg-transparent` |
| `text-black` | `dark:text-white` |
| `border-black` | `dark:border-white/20` |
| `hover:bg-gray-50` | `dark:hover:bg-white/5` |

---

## 6. 아이콘 (Iconography)
**Material Symbols Outlined**를 사용합니다.
*   크기: 보통 `20px` ~ `24px`.
*   굵기: 폰트 두께(Bold/Black)와 일치시킵니다.

---

## 7. 구현 체크리스트 (Implementation Checklist)
새로운 페이지나 컴포넌트를 만들 때 다음 사항을 확인하세요:
1.  [ ] 구조적 컨테이너에 `border-2 border-black`을 적용했는가?
2.  [ ] 깊이감을 위해 `.neo-shadow` 클래스를 사용했는가?
3.  [ ] 호버 상태에 `translate` 이동과 그림자 축소 효과를 포함했는가?
4.  [ ] 다크 모드 최적화(테두리 가시성 등)를 확인했는가?
5.  [ ] 영문 제목에는 `Plus Jakarta Sans`가 적용되었는가?
