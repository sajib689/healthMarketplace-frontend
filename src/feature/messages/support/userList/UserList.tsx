import Title from "antd/es/typography/Title";
import { FC, useMemo } from "react";
import getTimeDifference from "@/lib/getTimeDifference";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useAuthUser from "@/hooks/useGetMe";
import { TChatMember, TUserInfo } from "@/interfaces/message";
import { useGetSingleUserByIdQuery } from "@/redux/api/auth/authApi";
import Image from "next/image";
import { UserPlaceholder } from "@/lib/placeholder";

interface UserListProps {
  chatMembers: TChatMember[];
  joinChat: (participant1Id: string, participant2Id: string) => void;
  setActiveUser: (user: TUserInfo) => void;
}

interface UserCardProps extends TChatMember {
  setActiveUser: (user: TUserInfo) => void;
  joinChat: (participant1Id: string, participant2Id: string) => void;
  currentUserId?: string;
}

const UserList: FC<UserListProps> = ({
  chatMembers,
  joinChat,
  setActiveUser,
}) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user") as string;
  const currentUserId = useAuthUser()?.user?.id;

  const { data: singleUser } = useGetSingleUserByIdQuery(userId, {
    skip: !userId || chatMembers?.some((member) => member.user.id === userId),
  });

  const displayUsers = useMemo(() => {
    if (!chatMembers) return [];

    const users = [...chatMembers];
    if (
      userId &&
      singleUser &&
      !chatMembers.some((member) => member.user.id === userId)
    ) {
      users.unshift({
        user: singleUser?.data as TUserInfo,
        lastMessage: "",
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
      });
    }
    return users;
  }, [chatMembers, singleUser, userId]);

  return (
    <div className="bg-white rounded-2xl h-full flex flex-col shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Title level={4} className="!m-0 text-gray-800 font-semibold">
          Messages
        </Title>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {displayUsers.length > 0 ? (
          displayUsers.map((userData) => (
            <UserCard
              key={userData.user.id}
              {...userData}
              setActiveUser={setActiveUser}
              joinChat={joinChat}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500 italic">
            No contacts available
          </div>
        )}
      </div>
    </div>
  );
};

const UserCard: FC<UserCardProps & { currentUserId?: string }> = ({
  user,
  lastMessage,
  lastMessageTime,
  unreadCount,
  setActiveUser,
  joinChat,
  currentUserId,
}) => {
  const searchParams = useSearchParams();
  const isActive = searchParams.get("user") === String(user.id);

  const handleClick = () => {
    setActiveUser(user);
    if (currentUserId) {
      joinChat(currentUserId, user.id);
    }
  };

  return (
    <Link
      href={`/messaging?user=${user.id}`}
      onClick={handleClick}
      className={`flex items-center gap-4 p-4 border-l-2 transition-all duration-200 w-full 
        ${isActive
          ? "bg-gray-50 border-primary"
          : "border-transparent hover:bg-gray-50 hover:shadow-sm"
        }`}
    >
      {/* Avatar with Online Status */}
      <div className="relative">
        <Image
          src={user.profilePicture || UserPlaceholder.src}
          alt={`${user.firstName} ${user.lastName}`}
          width={48}
          height={48}
          className="rounded-full object-cover ring-1 ring-gray-200"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
          placeholder="blur"
          loading="lazy"
        />
        {user.isOnline && (
          <span className="absolute bottom-1 right-1 block size-3.5 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <Title
            level={5}
            className={`!m-0 font-semibold ${isActive ? "text-primary" : "text-gray-800"}`}
          >
            {user.firstName} {user.lastName}
          </Title>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {getTimeDifference(lastMessageTime)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate max-w-[200px]">
            {lastMessage ? `${lastMessage.slice(0, 30)}...` : "No messages yet"}
          </p>
          {unreadCount > 0 && (
            <span className="flex items-center justify-center text-xs font-medium text-white bg-primary rounded-full w-5 h-5">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserList;