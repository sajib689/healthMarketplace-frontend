"use client";
import useAuthUser from "@/hooks/useGetMe";
import { TUserInfo } from "@/interfaces/message";
import { Col, Row, Button } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../../../hooks/useChat";
import MessageBox from "./messageBox/MessageBox";
import UserList from "./userList/UserList";

const MessagesPage = () => {
  const [activeUser, setActiveUser] = useState<TUserInfo | null>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get("user");

  const { chatMembers, joinChat, messages, sendMessage, refreshChatMembers } =
    useChat();

  const currentUserId = useAuthUser()?.user?.id;
  const joinedRef = useRef<string | null>(null);

  // Refresh chat members on mount
  useEffect(() => {
    refreshChatMembers();
  }, [refreshChatMembers]);

  // Handle user from URL
  useEffect(() => {
    if (!userId) return;
    if (!chatMembers || chatMembers.length === 0) return;

    if (joinedRef.current === userId) return;

    const user = chatMembers.find((m) => m.user.id === userId)?.user;
    if (user) {
      setActiveUser(user);
      joinChat(currentUserId!, user.id);
      joinedRef.current = userId;
    }
  }, [userId, chatMembers, currentUserId, joinChat]);

  const handleUserClick = (user: TUserInfo) => {
    setActiveUser(user);
    joinChat(currentUserId!, user.id);
  };

  const handleBackToUsers = () => {
    setActiveUser(null);
    // Optionally clear the URL query param
    // You can use router.replace if needed
  };

  return (
    <div className="container my-2 sm:my-4 lg:my-12 h-[80vh]">
      <Row gutter={[16, 16]} className="h-full">
        {/* User List - Visible on desktop always, on mobile/tablet only when no active user */}
        <Col
          xs={24}
          xl={6}
          className={`${activeUser && !["xs", "sm", "md", "lg"].includes("xl") ? "hidden" : ""
            } ${!activeUser && !userId ? "block" : ""
            } xl:block h-[80vh] overflow-y-auto rounded-xl bg-gray-50`}
        >
          <UserList
            chatMembers={chatMembers}
            joinChat={joinChat}
            setActiveUser={handleUserClick}
          />
        </Col>

        {/* Chat Box - Full width on mobile when active user is selected */}
        <Col
          xs={24}
          xl={18}
          className={`${activeUser ? "block" : "hidden xl:block"} h-[80vh] flex flex-col`}
        >
          {activeUser ? (
            <div className="flex flex-col h-full">
              {/* Back Button for Mobile/Tablet */}
              <div className="xl:hidden p-2 border-b bg-white sticky top-0 z-10">
                <Button type="default" onClick={handleBackToUsers} size="small">
                  ← Back to Chats
                </Button>
              </div>

              <div className="flex-1">
                <MessageBox
                  activeUser={activeUser}
                  messages={messages}
                  sendMessage={sendMessage}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <p className="text-lg">Select a user to start chatting</p>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MessagesPage;