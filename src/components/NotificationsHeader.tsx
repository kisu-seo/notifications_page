/* === Header / Navigation === */
import { useRef } from 'react'

interface Props {
  unreadCount: number
  onMarkAllRead: () => void
}

export default function NotificationsHeader({ unreadCount, onMarkAllRead }: Props) {
  // --- 초기 렌더링 시 aria-live 발화 방지 ---
  const isMounted = useRef(false)

  function handleMarkAllRead() {
    isMounted.current = true
    onMarkAllRead()
  }

  return (
    <header className="flex items-center justify-between px-200 py-300 md:px-0 md:pt-0 md:pb-400">
      {/* --- Left: Title + Unread Badge --- */}
      <div className="flex items-center gap-100 md:gap-200">
        <h1 className="text-preset-2 text-navy-950 md:text-preset-1">Notifications</h1>
        {unreadCount > 0 && (
          <span
            className="bg-blue-950 text-white text-preset-4-bold rounded w-[32px] h-[25px] flex items-center justify-center"
            aria-label={`${unreadCount} unread notifications`}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {/* --- Right: Mark All as Read Button --- */}
      <button
        type="button"
        onClick={handleMarkAllRead}
        className="text-preset-4-medium text-gray-600 desktop:text-preset-3-medium hover:text-blue-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950 rounded"
      >
        Mark all as read
      </button>

      {/* --- Screen Reader Live Region / 스크린 리더 알림 영역 (인터랙션 후에만 발화) --- */}
      <div aria-live="polite" className="sr-only">
        {isMounted.current && unreadCount === 0 ? 'All notifications marked as read' : ''}
      </div>
    </header>
  )
}
