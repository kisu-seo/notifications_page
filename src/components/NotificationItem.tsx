/* === Notification Item / 개별 알림 행 === */
import clsx from 'clsx'
import type { Notification } from '../data'
import { formatTime } from '../utils/formatTime'

interface Props {
  notification: Notification
  onMarkRead: (id: number) => void
  className?: string
  isTopThree?: boolean
}

export default function NotificationItem({ notification, onMarkRead, className, isTopThree }: Props) {
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

  const classesArray = className?.split(' ') || []
  const hasPx = classesArray.some(cls => cls.includes('px-'))
  const hasPy = classesArray.some(cls => cls.includes('py-'))

  const pxClasses = classesArray.filter(cls => cls.includes('px-')).join(' ')
  const pyClasses = classesArray.filter(cls => cls.includes('py-')).join(' ')
  const liClasses = classesArray.filter(cls => !cls.includes('px-') && !cls.includes('py-')).join(' ')

  return (
    <li className={clsx(liClasses, 'md:text-preset-3-medium')}>
      <button
        type="button"
        onClick={() => onMarkRead(id)}
        aria-label={`${sender.name} ${message}${!isRead ? ', unread' : ''}`}
        className={clsx(
          'w-full text-left flex items-start gap-200',
          hasPx ? pxClasses : 'px-200',
          hasPy ? pyClasses : { 'py-100': !isRead, 'py-200': isRead },
          isTopThree && 'md:py-[16px] md:px-[24px]',
          'desktop-hover-brightness',
          'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-950',
          { 'bg-navy-50 rounded-lg': !isRead, 'bg-white': isRead }
        )}
      >
        {/* --- Avatar / 아바타 --- */}
        <img
          src={sender.avatar}
          alt={sender.name}
          className="w-[39px] h-[39px] md:w-[45px] md:h-[45px] rounded-full object-cover shrink-0"
        />

        {/* --- Text Area / 텍스트 영역 --- */}
        <div className="flex-1 min-w-0">
          {/* Notification Body / 알림 본문 */}
          <p className="text-preset-4-medium md:text-preset-3-medium text-gray-600 leading-snug">
            <span className="text-preset-4-bold md:text-preset-3-bold text-navy-950 inline mr-100 desktop-hover-text-navy">{sender.name}</span>
            {' '}
            {message}
            {linkText && (
              <>
                {' '}
                <span className="text-preset-4-bold md:text-preset-3-bold text-gray-600 inline ml-100 desktop-hover-text-navy">{linkText}</span>
              </>
            )}
            {groupName && (
              <>
                {' '}
                <span className="text-preset-4-bold md:text-preset-3-bold text-blue-950 inline ml-100 desktop-hover-text-navy">{groupName}</span>
              </>
            )}
            {/* Unread Dot / 안읽음 표시 */}
            {!isRead && (
              <span className={clsx(
                "inline-block w-2 h-2 bg-red-500 rounded-full ml-100 shrink-0",
                id === 1 && "md:ml-[6px]",
                isTopThree ? "align-top mt-[6px]" : "align-middle"
              )}>
                <span className="sr-only">Unread</span>
              </span>
            )}
          </p>

          {/* Timestamp / 타임스탬프 */}
          <p className="text-preset-4-medium md:text-preset-3-medium text-gray-500 mt-100">
            {formatTime(timestamp)}
          </p>

          {/* Private Message Preview / 메시지 미리보기 (message 타입만) */}
          {type === 'message' && privateMessage && (
            <div className="border border-navy-100 rounded-[5px] p-200 md:px-300 mt-100 text-preset-4-medium md:text-preset-3-medium text-gray-600 desktop-hover-bg-blue-100">
              {privateMessage}
            </div>
          )}
        </div>

        {/* --- Thumbnail / 썸네일 (comment 타입만) --- */}
        {type === 'comment' && thumbnail && (
          <img
            src={thumbnail}
            alt="Commented picture"
            className="w-[39px] h-[39px] md:w-[45px] md:h-[45px] rounded-lg object-cover shrink-0 self-start"
          />
        )}
      </button>
    </li>
  )
}
