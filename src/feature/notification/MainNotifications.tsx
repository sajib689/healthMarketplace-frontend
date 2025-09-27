/* eslint-disable react-hooks/exhaustive-deps */
import useAuthUser from "@/hooks/useGetMe";
import useNotifications from "@/hooks/useNotification";
import { Notification } from "@/interfaces/global";
import { Dispatch, SetStateAction, useEffect } from "react";
import NotificationIcon from "./NotificationIcon";

const MainNotifications = ({
  fetch,
  setUnread,
}: {
  fetch: boolean;
  setUnread?: Dispatch<SetStateAction<number>>;
}) => {
  const userId = useAuthUser()?.user?.id;

  const { notifications, unreadCount, getNotifications } =
    useNotifications(userId);

  useEffect(() => {
    getNotifications();
    setUnread?.(unreadCount);
  }, [fetch]);

  return (
    <div className="max-w-[280px]">
      <NotificationIcon
        notifications={notifications as Notification[]}
      />
    </div>
  );
};

export default MainNotifications;
