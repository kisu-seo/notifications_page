/* === Notification List / 알림 목록 === */
import type { Notification } from '../data'
import NotificationItem from './NotificationItem'

interface Props {
  notifications: Notification[]
  onMarkRead: (id: number) => void
}

export default function NotificationList({ notifications, onMarkRead }: Props) {
  return (
    <ul aria-label="Notifications list" className="list-none m-0 p-0 flex flex-col gap-100">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
        />
      ))}
    </ul>
  )
}
