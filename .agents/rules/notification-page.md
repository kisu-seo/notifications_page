---
trigger: always_on
---

## [기술 스택 강제 지침]

### 1. React (컴포넌트 뼈대 조립 및 데이터 분리)
- **컴포넌트 분리:** 전체 화면을 통짜로 짜지 말고, 유지보수를 위해
  **헤더 컴포넌트(Notifications Header)**와 **알림 목록 컴포넌트(Notification List)**,
  그리고 각 행을 담당하는 **개별 알림 컴포넌트(Notification Item)**로 명확히 나누어 조립해 줘.
- **데이터 분리 (Data Driven):** 화면에 보이는 알림 정보(발신자 이름, 아바타, 알림 유형,
  본문 내용, 타임스탬프, 읽음 여부)는 컴포넌트 내부에 하드코딩하지 마.
  별도의 `data.ts` 파일에 알림 배열(Array) 데이터를 선언한 뒤, `.map()` 함수를 사용해
  개별 'Notification Item 컴포넌트'로 깔끔하게 렌더링해 줘.

### 2. Tailwind CSS (반응형 레이아웃 및 정밀한 알림 UI)
- **유틸리티 클래스 활용:** 별도의 CSS 파일 작성 없이 **Tailwind CSS** 유틸리티 클래스만
  사용하여 시안과 동일한 색감(링크 텍스트의 네이비, 안읽음 표시의 빨간 dot), 텍스트 스타일,
  둥근 아바타 이미지를 구현해.
- **알림 UI 디테일:** 읽지 않은 알림 행은 연한 파란색 배경(`bg-blue-50` 등)이 적용되고,
  읽은 알림 행은 흰 배경으로 시각적으로 명확히 구분되게 만들어 줘.
  안읽음 빨간 dot(`bg-red-500`)은 알림 유형 문자열 바로 오른쪽에 배치해.
- **조건부 클래스 조합:** `isRead` 값에 따라 알림 행의 배경색을 동적으로 바꾸는 등,
  조건에 따라 Tailwind 클래스를 조합할 때는 `clsx` 라이브러리를 사용해 줘.
  삼항 연산자를 중첩해서 문자열을 직접 이어붙이지 마.
  예: `clsx('px-5 py-4 rounded-lg', { 'bg-blue-50': !isRead, 'bg-white': isRead })`
- **Mobile First (반응형 레이아웃):** 모바일(기본)에서는 카드가 화면 전체 너비를 차지하며
  알림 항목이 세로로 쭉 나열되는 단일 컬럼 구조로 배치해 줘.
- **데스크톱 화면 전환:** 데스크톱(`md:` 이상)에서는 카드가 최대 너비로 고정(`max-w-2xl`,
  `mx-auto`)되어 중앙 정렬되는 레이아웃으로 매끄럽게 전환되게 해 줘.
- **인터랙티브 상태:** 모든 클릭 가능한 요소(알림 행, 링크 텍스트, 'Mark all as read' 버튼,
  아바타 썸네일)에 `hover:` 및 `focus-visible:` 클래스를 적용하여 마우스 오버 및
  키보드 포커스 상태가 명확히 보이도록 구현해.

### 3. React State & TypeScript (알림 읽음 상태 관리)
- **`useReducer` 전환 권장:** 상태 로직이 "개별 읽음 전환"과 "전체 읽음 처리" 두 갈래로
  나뉘므로, `useState` 대신 `useReducer`를 사용해 줘.
  액션 타입은 `'MARK_READ'`와 `'MARK_ALL_READ'`로 명확히 분리해 줘.
- **상태 구조:** `notifications` 배열 안의 각 객체에는 알림 ID, 발신자 정보,
  알림 유형(`'reaction' | 'follow' | 'group_join' | 'message' | 'comment' | 'group_leave'`),
  본문, 타임스탬프, 그리고 **읽음 여부(`isRead: boolean`)** 필드가 포함되어야 해.
- **동적 카운트 업데이트:** 헤더의 읽지 않은 알림 수 뱃지는 `notifications` 상태에서
  `isRead === false`인 항목을 `.filter()`로 실시간 계산하여 렌더링되어야 해.
  'Mark all as read'를 클릭하면 모든 항목의 `isRead`가 `true`로 업데이트되고
  뱃지 숫자가 즉시 0으로 바뀌어야 해.
- **읽음 상태 전환:** 개별 알림 행을 클릭하면 해당 항목만 `isRead: true`로 전환되어
  파란 배경이 흰 배경으로 자연스럽게 교체되도록 구현해 줘.
- **타임스탬프 포맷팅:** 각 알림의 `timestamp` 필드는 `Date` 객체로 저장하고,
  화면에는 "1m ago", "1 day ago", "2 weeks ago"처럼 상대적 시간으로 표시해 줘.
  `date-fns`의 `formatDistanceToNow()` 함수를 사용하거나, 직접 유틸 함수를 작성해도 돼.
- **조건부 렌더링:** 알림 유형이 `'message'`인 항목은 본문 미리보기 박스를,
  `'comment'`처럼 첨부 이미지가 있는 항목은 우측에 썸네일을 조건부로 렌더링해 줘.

### 4. 접근성 (Keyboard Navigation & Screen Reader)
- **시맨틱 마크업:** 알림 목록은 `<ul>` + `<li>` 구조로 마크업하고,
  클릭 가능한 알림 행은 `<button>` 태그 또는 `role="button"`으로 감싸줘.
- **숨김 텍스트:** 안읽음 빨간 dot은 시각적 표시에 불과하므로,
  스크린 리더 사용자를 위해 `<span class="sr-only">Unread</span>` 텍스트를 함께 제공해.
- **aria 속성:** 헤더의 뱃지 숫자에는 `aria-label="3 unread notifications"`처럼
  읽기 쉬운 레이블을 붙여줘. 'Mark all as read' 버튼 클릭 후에는 상태 변경을
  스크린 리더가 인식할 수 있도록 `aria-live="polite"` 영역에서 알려줘.
- **키보드 네비게이션:** `Tab` 키로 모든 인터랙티브 요소(알림 행, Mark all as read,
  링크 텍스트, 썸네일 이미지)를 순서대로 이동할 수 있어야 하고, `Enter` / `Space` 키로
  클릭과 동일한 동작이 수행되어야 해.