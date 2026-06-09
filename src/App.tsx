/* === App Root / 앱 루트 === */
import { useReducer } from 'react'
import type { Notification } from './data'
import { initialNotifications } from './data'
import NotificationsHeader from './components/NotificationsHeader'
import NotificationList from './components/NotificationList'

// --- State & Reducer / 상태 및 리듀서 ---
interface State {
  notifications: Notification[]
}

type Action =
  | { type: 'MARK_READ'; id: number }
  | { type: 'MARK_ALL_READ' }

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

// --- App Component / 앱 컴포넌트 ---
export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    notifications: initialNotifications,
  })

  const unreadCount = state.notifications.filter((n) => !n.isRead).length

  return (
    <div className="min-h-screen bg-navy-50 min-[1028px]:flex min-[1028px]:items-center min-[1028px]:justify-center min-[1028px]:py-[40px]">
      <main className="w-full bg-white font-sans md:py-[60px] md:px-[49px] min-[1028px]:w-[730px] min-[1028px]:p-0 min-[1028px]:rounded-2xl min-[1028px]:shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
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
