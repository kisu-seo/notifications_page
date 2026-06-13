/* === [Header / Navigation - 헤더 영역] === */
import { useState } from 'react'

/**
 * @interface Props
 * @description NotificationsHeader 컴포넌트의 속성(Properties) 타입 정의
 * @property {number} unreadCount - 읽지 않은 알림 수
 * @property {() => void} onMarkAllRead - 'Mark all as read' 클릭 시 실행할 핸들러 함수
 */
interface Props {
  unreadCount: number
  onMarkAllRead: () => void
}

/**
 * @component NotificationsHeader
 * @description 알림 페이지 상단의 제목, 미확인 알림 개수 뱃지, 전체 읽음 처리 버튼을 렌더링하는 헤더 컴포넌트
 */
export default function NotificationsHeader({ unreadCount, onMarkAllRead }: Props) {
  // --- Screen Reader Announcement State / 스크린 리더 알림 메시지 상태 ---
  const [announcement, setAnnouncement] = useState('')

  // --- Handle Mark All as Read / 전체 읽음 처리 이벤트 핸들러 ---
  function handleMarkAllRead() {
    setAnnouncement('All notifications marked as read')
    onMarkAllRead()
  }

  return (
    <header className="flex items-center justify-between px-200 py-300 md:px-0 md:pt-0 md:pb-400">
      {/* --- Left: Title + Unread Badge / 좌측: 제목 및 읽지 않은 알림 개수 뱃지 --- */}
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

      {/* --- Right: Mark All as Read Button / 우측: 전체 읽음 처리 버튼 --- */}
      <button
        type="button"
        onClick={handleMarkAllRead}
        className="text-preset-4-medium text-gray-600 desktop:text-preset-3-medium desktop-hover-text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950 rounded"
      >
        Mark all as read
      </button>

      {/* --- Screen Reader Live Region / 스크린 리더 실시간 알림 영역 (인터랙션 완료 후 발화) --- */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </header>
  )
}
