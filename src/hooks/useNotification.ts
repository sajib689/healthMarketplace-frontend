/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSocket } from "@/context/SocketContext";
import { Notification } from "@/interfaces/global";
import { useEffect, useState, useCallback } from "react";


const useNotifications = (userId: string) => {
 const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Listen to events
  useEffect(() => {
    if (!socket) return;

    // Unread count listener
    socket.on("unread_notifications_count", (count: number) => {
      setUnreadCount(count);
    });

    // Notification history listener
    socket.on("notification_history",
      ( enrichedNotifications) => {
        setNotifications(enrichedNotifications);
      }
    );

    // Notification read updates
    socket.on("notificationRead", (notificationId: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
    });

    // All notifications read
    socket.on("allNotificationsRead", ({ count }: { count: number }) => {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    });

    // Errors
    socket.on("notification_error", (error) => {
      console.error("Notification error:", error);
    });

    return () => {
      socket.off("unread_notifications_count");
      socket.off("notification_history");
      socket.off("notificationRead");
      socket.off("allNotificationsRead");
      socket.off("notification_error");
    };
  }, [socket]);

  // get notifications
  const getNotifications = useCallback(
    (query = {}) => {
      if (!socket) return;
      socket.emit("get_notifications", query);
    },
    [socket]
  );


  // Mark single notification as read
  const markAsRead = useCallback(
    (notificationId: string) => {
      if (!socket) return;
      socket.emit("markAsRead", { notificationId });
    },
    [socket]
  );

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    if (!socket) return;
    socket.emit("markAllAsRead", { userId });
  }, [socket, userId]);

  return {
    notifications,
    unreadCount,
    getNotifications,
    markAsRead,
    markAllAsRead,
  };
};

export default useNotifications;
