/* === [App Root / 앱 루트] === */
import { useReducer } from 'react'
import type { Notification } from './data'
import { initialNotifications } from './data'
import NotificationsHeader from './components/NotificationsHeader'
import NotificationList from './components/NotificationList'

/* === [State & Reducer / 상태 및 리듀서 정의] === */

/**
 * @interface State
 * @description 애플리케이션의 상태(State) 구조 정의
 * @property {Notification[]} notifications - 알림 객체 배열 (데이터 목록)
 */
interface State {
  notifications: Notification[]
}

/**
 * @type Action
 * @description 알림 읽음 상태 제어를 위한 액션(Action) 타입 정의
 */
type Action =
  | { type: 'MARK_READ'; id: number }
  | { type: 'MARK_ALL_READ' }

/**
 * @function reducer
 * @description 알림의 개별/전체 읽음 상태 처리를 수행하는 리듀서(Reducer) 함수
 * @param {State} state - 현재 상태 객체
 * @param {Action} action - 실행할 액션 객체
 * @returns {State} 업데이트된 새로운 상태 객체
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MARK_READ':
      return {
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, isRead: true } : n
        ),
      }
    case 'MARK_ALL_READ':
      return {
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      }
    default:
      return state
  }
}

/* === [App Component / 앱 컴포넌트 메인] === */

/**
 * @component App
 * @description 알림 페이지의 메인 레이아웃 및 비즈니스 로직을 구성하는 최상위 컴포넌트
 */
export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    notifications: initialNotifications,
  })

  // --- Calculate Unread Count / 읽지 않은 알림 수 실시간 계산 ---
  const unreadCount = state.notifications.filter((n) => !n.isRead).length

  return (
    <div className="min-h-screen bg-navy-50 min-[1028px]:flex min-[1028px]:items-center min-[1028px]:justify-center min-[1028px]:py-500">
      <main className="w-full bg-white font-sans md:max-desktop:py-[60px] md:max-desktop:px-[49px] min-[1028px]:w-[730px] desktop:py-300 desktop:px-400 min-[1028px]:rounded-2xl min-[1028px]:shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
        <NotificationsHeader
          unreadCount={unreadCount}
          onMarkAllRead={() => dispatch({ type: 'MARK_ALL_READ' })}
        />
        <NotificationList
          notifications={state.notifications}
          onMarkRead={(id) => dispatch({ type: 'MARK_READ', id })}
        />
      </main>
    </div>
  )
}
