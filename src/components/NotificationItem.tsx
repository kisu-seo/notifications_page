/* === [Notification Item - 개별 알림 항목 컴포넌트] === */
import clsx from 'clsx'
import type { Notification } from '../data'
import { formatTime } from '../utils/formatTime'

/**
 * @interface Props
 * @description NotificationItem 컴포넌트의 속성(Properties) 타입 정의
 * @property {Notification} notification - 개별 알림 데이터 객체
 * @property {(id: number) => void} onMarkRead - 알림 클릭 시 읽음 처리를 수행할 핸들러 함수
 * @property {string} [className] - 외부에서 유동적으로 주입받은 커스텀 Tailwind CSS 클래스
 * @property {boolean} [isTopThree] - 상위 3개 알림(읽지 않은 알림 강조 대상) 여부
 */
interface Props {
  notification: Notification
  onMarkRead: (id: number) => void
  className?: string
  isTopThree?: boolean
}

/**
 * @function extractPaddingClasses
 * @description 부모 컴포넌트로부터 넘어온 클래스 중 패딩(Padding) 관련 클래스를 분리하여 리스트 아이템(li)과 버튼(button)에 각기 분배하기 위한 헬퍼 함수
 * @param {string} [className] - 외부 클래스 문자열
 * @returns {object} 패딩 클래스 분리 결과 객체
 */
function extractPaddingClasses(className?: string) {
  if (!className) {
    return { pxClasses: '', pyClasses: '', otherClasses: '', hasPx: false, hasPy: false }
  }

  const classes = className.split(' ')
  const pxList = classes.filter((cls) => cls.includes('px-'))
  const pyList = classes.filter((cls) => cls.includes('py-'))
  const otherList = classes.filter((cls) => !cls.includes('px-') && !cls.includes('py-'))

  return {
    pxClasses: pxList.join(' '),
    pyClasses: pyList.join(' '),
    otherClasses: otherList.join(' '),
    hasPx: pxList.length > 0,
    hasPy: pyList.length > 0,
  }
}

/**
 * @component NotificationItem
 * @description 개별 알림 메시지 행을 표현하며, 알림 종류에 따라 조건부 레이아웃(메시지 박스, 썸네일 이미지 등)을 렌더링하고 읽음 토글을 처리하는 컴포넌트
 */
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

  // --- Style Class Allocation / 스타일 클래스 추출 및 배분 ---
  const { pxClasses, pyClasses, otherClasses, hasPx, hasPy } = extractPaddingClasses(className)

  return (
    <li className={clsx(otherClasses, 'md:text-preset-3-medium')}>
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
        {/* --- Avatar Thumbnail / 아바타 프로필 이미지 --- */}
        <img
          src={sender.avatar}
          alt={sender.name}
          className="w-[39px] h-[39px] md:w-[45px] md:h-[45px] rounded-full object-cover shrink-0"
        />

        {/* --- Notification Body Area / 알림 본문 영역 --- */}
        <div className="flex-1 min-w-0">
          {/* --- Text Content / 텍스트 내용 --- */}
          <p className="text-preset-4-medium md:text-preset-3-medium text-gray-600 leading-snug">
            <span className="text-preset-4-bold md:text-preset-3-bold text-navy-950 inline mr-100 desktop-hover-text-navy">{sender.name}</span>
            {' '}
            {message}
            {linkText && ' '}
            {linkText && (
              <span className="text-preset-4-bold md:text-preset-3-bold text-gray-600 inline ml-100 desktop-hover-text-navy">{linkText}</span>
            )}
            {groupName && ' '}
            {groupName && (
              <span className="text-preset-4-bold md:text-preset-3-bold text-blue-950 inline ml-100 desktop-hover-text-navy">{groupName}</span>
            )}
            {/* --- Unread Dot Indicator / 읽지 않은 알림을 뜻하는 빨간 점 표시 --- */}
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

          {/* --- Relative Timestamp / 상대적인 시간대 정보 --- */}
          <p className="text-preset-4-medium md:text-preset-3-medium text-gray-500 mt-100">
            {formatTime(timestamp)}
          </p>

          {/* --- Private Message Preview / 비공개 메시지 미리보기 (message 유형에만 해당) --- */}
          {type === 'message' && privateMessage && (
            <div className="border border-navy-100 rounded-[5px] p-200 md:px-300 mt-100 text-preset-4-medium md:text-preset-3-medium text-gray-600 desktop-hover-bg-blue-100">
              {privateMessage}
            </div>
          )}
        </div>

        {/* --- Media Thumbnail / 미디어 첨부 이미지 썸네일 (comment 유형에만 해당) --- */}
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
