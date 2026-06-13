/* === [Notification List - 알림 목록 컴포넌트] === */
import clsx from 'clsx'
import type { Notification } from '../data'
import NotificationItem from './NotificationItem'

/**
 * @interface Props
 * @description NotificationList 컴포넌트의 속성(Properties) 타입 정의
 * @property {Notification[]} notifications - 렌더링할 알림 객체 배열
 * @property {(id: number) => void} onMarkRead - 개별 알림 클릭 시 읽음 처리를 수행할 핸들러 함수
 */
interface Props {
  notifications: Notification[]
  onMarkRead: (id: number) => void
}

/**
 * @component NotificationList
 * @description 알림 데이터 배열을 전달받아 개별 알림 항목(NotificationItem)들을 리스트 형태로 렌더링하는 컴포넌트
 */
export default function NotificationList({ notifications, onMarkRead }: Props) {
  return (
    <ul aria-label="Notifications list" className="list-none m-0 p-0 flex flex-col">
      {notifications.map((notification, index) => {
        // --- Index-based styling rules / 인덱스별(피그마 시안 기준) 스타일 규칙 설정 ---
        const itemClassName = clsx(
          {
            'mt-100': index === 1 || index === 2,
            'mt-400 md:mt-[26px]': index === 3,
            'mt-500': index >= 4,
          },
          index < 3 
            ? 'w-[343px] md:w-[670px] mx-auto' 
            : 'w-[318px] md:w-[630px] mx-auto px-0 py-0'
        )

        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkRead={onMarkRead}
            className={itemClassName}
            isTopThree={index < 3}
          />
        )
      })}
    </ul>
  )
}
