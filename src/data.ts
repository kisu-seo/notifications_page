/* === [Notification Data - 알림 데이터 정의] === */

/* === [Type Definitions / 타입 정의] === */

/**
 * @type NotificationType
 * @description 알림의 발생 원인 및 종류를 명시하는 유니온(Union) 타입
 */
export type NotificationType =
  | 'reaction'
  | 'follow'
  | 'group_join'
  | 'message'
  | 'comment'
  | 'group_leave';

/**
 * @interface Notification
 * @description 개별 알림 개체가 지녀야 하는 스키마(Schema) 타입 정의
 * @property {number} id - 알림의 고유 식별값(ID)
 * @property {object} sender - 발신자 정보 객체
 * @property {string} sender.name - 발신자 이름
 * @property {string} sender.avatar - 발신자 프로필 이미지 경로
 * @property {NotificationType} type - 알림 종류
 * @property {string} message - 알림 설명 텍스트
 * @property {string} [linkText] - 알림과 연동된 링크 텍스트
 * @property {string} [groupName] - 그룹 활동 관련 알림의 경우 해당 그룹 이름
 * @property {string} [privateMessage] - 비공개 메시지 알림의 경우 메시지 본문 미리보기
 * @property {string} [thumbnail] - 댓글이나 첨부 파일이 있는 알림의 경우 해당 썸네일 이미지 경로
 * @property {Date} timestamp - 알림 발생 시각 객체
 * @property {boolean} isRead - 해당 알림의 읽음(Read)/안읽음(Unread) 상태 여부
 */
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

/* === [Notification Mock Data / 알림 모크 데이터 정의] === */

/**
 * @const initialNotifications
 * @type {Notification[]}
 * @description 애플리케이션의 화면 테스트 및 초기 상태 구성을 위한 알림 모크(Mock) 데이터 배열
 */
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
