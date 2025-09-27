/* eslint-disable @typescript-eslint/no-explicit-any */
export type TUserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  profilePicture?: string | null;
  isOnline?: boolean;
  lastSeen?: Date | null;
};

export type TMessage = {
  id: string;
  chatroomId: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string; // or Date
  sender: TUserInfo;
  receiver: TUserInfo;
};

export type TChatMember = {
  user: TUserInfo;
  lastMessage: string;
  lastMessageTime: string | Date; 
  unreadCount: number;
}
// For an array of chat members



export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  entityType?: string;
  entityId?: string;
  entity?: any;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

export interface NotificationHistoryResponse {
  meta: any;
  enrichedNotifications: Notification[];
}