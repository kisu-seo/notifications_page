/* === Notification Data / 알림 데이터 === */

// --- Type Definitions / 타입 정의 ---
export type NotificationType =
  | 'reaction'
  | 'follow'
  | 'group_join'
  | 'message'
  | 'comment'
  | 'group_leave';

export interface Notification {
  id: number;
  sender: {
    name: string;
    avatar: string;
  };
  type: NotificationType;
  message: string;
  linkText?: string;
  groupName?: string;
  privateMessage?: string;
  thumbnail?: string;
  timestamp: Date;
  isRead: boolean;
}

// --- Notification Array / 알림 배열 ---
export const initialNotifications: Notification[] = [
  {
    id: 1,
    sender: {
      name: 'Mark Webber',
      avatar: '/assets/images/avatar-mark-webber.webp',
    },
    type: 'reaction',
    message: 'reacted to your recent post',
    linkText: 'My first tournament today!',
    timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    isRead: false,
  },
  {
    id: 2,
    sender: {
      name: 'Angela Gray',
      avatar: '/assets/images/avatar-angela-gray.webp',
    },
    type: 'follow',
    message: 'followed you',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
  },
  {
    id: 3,
    sender: {
      name: 'Jacob Thompson',
      avatar: '/assets/images/avatar-jacob-thompson.webp',
    },
    type: 'group_join',
    message: 'has joined your group',
    groupName: 'Chess Club',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRead: false,
  },
  {
    id: 4,
    sender: {
      name: 'Rizky Hasanuddin',
      avatar: '/assets/images/avatar-rizky-hasanuddin.webp',
    },
    type: 'message',
    message: 'sent you a private message',
    privateMessage:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isRead: true,
  },
  {
    id: 5,
    sender: {
      name: 'Kimberly Smith',
      avatar: '/assets/images/avatar-kimberly-smith.webp',
    },
    type: 'comment',
    message: 'commented on your picture',
    thumbnail: '/assets/images/image-chess.webp',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    isRead: true,
  },
  {
    id: 6,
    sender: {
      name: 'Nathan Peterson',
      avatar: '/assets/images/avatar-nathan-peterson.webp',
    },
    type: 'reaction',
    message: 'reacted to your recent post',
    linkText: '5 end-game strategies to increase your win rate',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    isRead: true,
  },
  {
    id: 7,
    sender: {
      name: 'Anna Kim',
      avatar: '/assets/images/avatar-anna-kim.webp',
    },
    type: 'group_leave',
    message: 'left the group',
    groupName: 'Chess Club',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    isRead: true,
  },
];
