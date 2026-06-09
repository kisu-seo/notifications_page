/* === Notification Item / 개별 알림 행 === */
import clsx from 'clsx'
import type { Notification } from '../data'
import { formatTime } from '../utils/formatTime'

interface Props {
  notification: Notification
  onMarkRead: (id: number) => void
}

export default function NotificationItem({ notification, onMarkRead }: Props) {
  const {
    id,
    sender,
    type,
    message,
    linkText,
    groupName,
    privateMessage,
    thumbnail,
    timestamp,
    isRead,
  } = notification

  return (
    <li className="px-200">
      <button
        type="button"
        onClick={() => onMarkRead(id)}
        aria-label={`${sender.name} ${message}${!isRead ? ', unread' : ''}`}
        className={clsx(
          'w-full text-left flex items-start gap-200 px-200',
          { 'py-100': !isRead, 'py-200': isRead },
          'hover:brightness-[0.97] transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-950',
          { 'bg-navy-50 rounded-lg': !isRead, 'bg-white': isRead }
        )}
      >
        {/* --- Avatar / 아바타 --- */}
        <img
          src={sender.avatar}
          alt={sender.name}
          className="w-[39px] h-[39px] rounded-full object-cover shrink-0"
        />

        {/* --- Text Area / 텍스트 영역 --- */}
        <div className="flex-1 min-w-0">
          {/* Notification Body / 알림 본문 */}
          <p className="text-preset-4-medium text-gray-600 leading-snug">
            <span className="text-preset-4-bold text-navy-950 inline-block mr-100">{sender.name}</span>
            {' '}
            {message}
            {linkText && (
              <>
                {' '}
                <span className="text-preset-4-bold text-gray-600 inline-block ml-100">{linkText}</span>
              </>
            )}
            {groupName && (
              <>
                {' '}
                <span className="text-preset-4-bold text-blue-950 inline-block ml-100">{groupName}</span>
              </>
            )}
            {/* Unread Dot / 안읽음 표시 */}
            {!isRead && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-100 align-middle shrink-0">
                <span className="sr-only">Unread</span>
              </span>
            )}
          </p>

          {/* Timestamp / 타임스탬프 */}
          <p className="text-preset-4-medium text-gray-500 mt-100">
            {formatTime(timestamp)}
          </p>

          {/* Private Message Preview / 메시지 미리보기 (message 타입만) */}
          {type === 'message' && privateMessage && (
            <div className="border border-navy-100 rounded-lg px-200 py-[12px] mt-100 text-preset-4-medium text-gray-600">
              {privateMessage}
            </div>
          )}
        </div>

        {/* --- Thumbnail / 썸네일 (comment 타입만) --- */}
        {type === 'comment' && thumbnail && (
          <img
            src={thumbnail}
            alt="Commented picture"
            className="w-10 h-10 rounded-lg object-cover shrink-0 self-center"
          />
        )}
      </button>
    </li>
  )
}
