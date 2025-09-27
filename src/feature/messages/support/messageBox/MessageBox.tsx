/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import ChatMessage from "../chats/ChatMessage";
import ChatInput from "../chatInput/ChaptInput";
import getTimeDifference from "@/lib/getTimeDifference";
import { TMessage, TUserInfo } from "@/interfaces/message";
import { useEffect, useRef } from "react";
import { UserPlaceholder } from "@/lib/placeholder";

interface MessageProps {
  activeUser: TUserInfo | null;
  messages: TMessage[];
  sendMessage: any;
}

const MessageBox = ({ activeUser, messages, sendMessage }: MessageProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-white rounded-lg lg:px-[22px] flex flex-col py-4 max-h-[80vh]">
      {/* Header */}
      <div className="border-b border-gray-300 pb-[15px] flex gap-4 items-center flex-shrink-0">
        <Image
          className="!size-[60px] overflow-hidden object-cover !rounded-lg"
          alt={activeUser?.firstName}
          src={
            activeUser?.profilePicture || UserPlaceholder.src
          }
        />
        <div>
          <Paragraph className="!leading-0">
            {activeUser?.firstName} {activeUser?.lastName}
          </Paragraph>
          <div className="flex items-center gap-3">
            <p className="text-primary !font-normal flex items-center gap-1">
              <span className="size-[12px] rounded-full bg-primary"></span>
              {activeUser?.isOnline ? "Online" : "Offline"}
            </p>
            {!activeUser?.isOnline && (
              <p className="text-gray-600">
                {getTimeDifference(activeUser?.lastSeen || "")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div
          style={{
            scrollBehavior: "smooth"
          }}
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 py-2"
        >
          <ChatMessage messages={messages} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 pt-2">
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default MessageBox;
