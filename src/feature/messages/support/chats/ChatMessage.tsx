import useAuthUser from "@/hooks/useGetMe";
import { TMessage } from "@/interfaces/message";
import formatDate from "@/lib/getFromateDays";
import getTimeDifference from "@/lib/getTimeDifference";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { FaCheckDouble, FaCheck, FaClock } from "react-icons/fa";

interface ChatMessageProps {
  messages: TMessage[];
  isTyping?: boolean;
  onMessageRead?: (messageId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  messages,
  isTyping = false,
  onMessageRead
}) => {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("user") || "";
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthUser();
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto-scroll to bottom when new messages arrive, but only if user is near bottom
  useEffect(() => {
    if (containerRef.current && shouldAutoScroll) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom) {
        containerRef.current.scrollTop = scrollHeight;
      }
    }
  }, [messages, isTyping, shouldAutoScroll]);

  // Handle scroll to detect if user is manually scrolling
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  }, []);

  // Mark messages as read when they come into view (intersection observer could be used for better performance)
  useEffect(() => {
    if (onMessageRead && messages.length > 0) {
      const unreadMessages = messages.filter(msg =>
        !msg.isRead &&
        msg.senderId === receiverId &&
        msg.receiverId === user?.id
      );

      unreadMessages.forEach(msg => {
        onMessageRead(msg.id);
      });
    }
  }, [messages, onMessageRead, receiverId, user?.id]);

  // Memoize grouped messages with better date handling
  const groupedMessages = useMemo(() => {
    const groups: Record<string, TMessage[]> = {};
    const sortedMessages = [...messages].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    sortedMessages.forEach(msg => {
      const date = new Date(msg.createdAt);
      const dateKey = date.toDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(msg);
    });

    return groups;
  }, [messages]);

  // Helper functions
  const isMessageFromCurrentUser = useCallback(
    (senderId: string) => senderId === user?.id,
    [user?.id]
  );

  const getMessageStatusIcon = useCallback((msg: TMessage) => {
    if (!isMessageFromCurrentUser(msg.senderId)) return null;

    // Show different icons based on message status
    if (msg.isRead) {
      return <FaCheckDouble className="text-blue-400 text-[10px]" title="Read" />;
    }
    // You might want to add a "delivered" field to your message type
    return <FaCheck className="text-gray-300 text-[10px]" title="Delivered" />;
  }, [isMessageFromCurrentUser]);

  const shouldShowAvatar = useCallback((msg: TMessage, index: number, dayMessages: TMessage[]) => {
    const nextMsg = dayMessages[index + 1];
    return !nextMsg || nextMsg.senderId !== msg.senderId;
  }, []);

  const shouldShowTimestamp = useCallback((msg: TMessage, index: number, dayMessages: TMessage[]) => {
    const nextMsg = dayMessages[index + 1];
    if (!nextMsg || nextMsg.senderId !== msg.senderId) return true;

    // Show timestamp if more than 5 minutes between messages
    const currentTime = new Date(msg.createdAt).getTime();
    const nextTime = new Date(nextMsg.createdAt).getTime();
    return nextTime - currentTime > 5 * 60 * 1000;
  }, []);

  const getSenderName = useCallback((msg: TMessage) => {
    if (isMessageFromCurrentUser(msg.senderId)) return "You";
    return `${msg.sender.firstName} ${msg.sender.lastName}`.trim();
  }, [isMessageFromCurrentUser]);

  // Early returns
  if (!user) {
    return (
      <div className="size-full bg-gray-50 p-4 flex items-center justify-center min-h-[62vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 text-sm">Loading messages...</div>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="size-full bg-gray-50 p-4 flex items-center justify-center min-h-[62vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-gray-600 font-medium mb-1">No messages yet</p>
          <p className="text-gray-400 text-sm">Send a message to start the conversation!</p>
        </div>
      </div>
    );
  }

  const TypingIndicator = () => (
    <div className="flex justify-start mb-2">
      <div className="bg-white rounded-lg px-4 py-3 shadow-sm border max-w-[70%]">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">typing...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="size-full bg-gray-50 p-4 overflow-y-auto min-h-[62vh] scroll-smooth"
    >
      {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
        <div key={dateKey} className="mb-6">
          {/* Date Divider */}
          <div className="flex justify-center mb-4 sticky top-0 z-10">
            <span className="bg-white/90 backdrop-blur-sm text-gray-600 px-4 py-2 text-xs font-medium rounded-full shadow-sm border border-gray-200">
              {formatDate(dayMessages[0].createdAt)}
            </span>
          </div>

          {/* Messages for this day */}
          <div className="space-y-1">
            {dayMessages.map((msg, index) => {
              const isFromCurrentUser = isMessageFromCurrentUser(msg.senderId);
              const showAvatar = shouldShowAvatar(msg, index, dayMessages);
              const showTimestamp = shouldShowTimestamp(msg, index, dayMessages);
              const isConsecutive = index > 0 && dayMessages[index - 1].senderId === msg.senderId;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isFromCurrentUser ? "justify-end" : "justify-start"} ${isConsecutive ? "mt-1" : "mt-3"
                    }`}
                >
                  {/* Avatar for received messages */}
                  {!isFromCurrentUser && (
                    <div className="flex flex-col justify-end">
                      {showAvatar ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                          {msg.sender.firstName?.[0]?.toUpperCase() || '?'}
                        </div>
                      ) : (
                        <div className="w-8 h-8"></div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col max-w-[70%]">
                    {/* Sender name for group chats or first message in sequence */}
                    {!isFromCurrentUser && !isConsecutive && (
                      <span className="text-xs text-gray-500 mb-1 ml-3">
                        {getSenderName(msg)}
                      </span>
                    )}

                    <div
                      className={`
                        px-4 py-2 rounded-2xl relative group
                        ${isFromCurrentUser
                          ? "bg-blue-500 text-white ml-auto rounded-br-md"
                          : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                        }
                        ${isConsecutive ? 'rounded-t-2xl' : ''}
                      `}
                    >
                      <p className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                        {msg.content}
                      </p>

                      {/* Message metadata */}
                      {showTimestamp && (
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div
                            className={`
                              flex items-center gap-1 text-[10px]
                              ${isFromCurrentUser ? "text-blue-100" : "text-gray-400"}
                            `}
                          >
                            <FaClock className="text-[8px]" />
                            <span>{getTimeDifference(msg.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            {getMessageStatusIcon(msg)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {isTyping && <TypingIndicator />}

      {/* Scroll to bottom button */}
      {!shouldAutoScroll && (
        <button
          onClick={() => {
            setShouldAutoScroll(true);
            if (containerRef.current) {
              containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
          }}
          className="fixed bottom-20 right-6 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-20"
          title="Scroll to bottom"
        >
          ↓
        </button>
      )}
    </div>
  );
};

export default ChatMessage;