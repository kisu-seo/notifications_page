/* === Notification List / 알림 목록 === */
import type { Notification } from '../data'
import NotificationItem from './NotificationItem'

interface Props {
  notifications: Notification[]
  onMarkRead: (id: number) => void
}

export default function NotificationList({ notifications, onMarkRead }: Props) {
  return (
    <ul aria-label="Notifications list" className="list-none m-0 p-0 flex flex-col">
      {notifications.map((notification, index) => {
        const classes: string[] = []

        if (index === 1 || index === 2) {
          classes.push('mt-100')
        } else if (index === 3) {
          classes.push('mt-400 md:mt-[26px]')
        } else if (index >= 4) {
          classes.push('mt-500')
        }

        if (index < 3) {
          classes.push('w-[343px] md:w-[670px] mx-auto')
        }

        if (index >= 3) {
          classes.push('w-[318px] md:w-[630px] mx-auto px-0 py-0')
        }

        const itemClassName = classes.length > 0 ? classes.join(' ') : undefined

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
