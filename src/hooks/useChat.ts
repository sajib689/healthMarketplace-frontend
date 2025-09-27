/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export const useChat = () => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<any[]>([]);
  const [typingStatus, setTypingStatus] = useState<{
    userId: string;
    isTyping: boolean;
  } | null>(null);
  const [chatMembers, setChatMembers] = useState<any[]>([]);
  const [currentChatroom, setCurrentChatroom] = useState<string | null>(null);

  // Initialize all socket listeners
  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleChatMembers = (chats: any[]) => {
      setChatMembers(chats);
      console.log("useChat: chatMembers", chats);
    };

    const handleMessageHistory = (messages: any[]) => {
      console.log(messages, "messageHistory");
      setMessages(messages);
    };

    const handleReceiveMessage = (message: any) => {
      console.log(message, "receiveMessage");
      setMessages((prev) => [...prev, message]);
    };

    const handleTyping = (data: { userId: string; isTyping: boolean }) => {
      setTypingStatus(data);
    };

    const handleMessageRead = ({ messageId }: { messageId: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    };

    socket.on("chatMembers", handleChatMembers);
    socket.on("messageHistory", handleMessageHistory);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("messageRead", handleMessageRead);
    socket.on("chatError", console.error);

    // Request chat members on connection
    socket.emit("refreshChatMembers");

    return () => {
      socket.off("chatMembers", handleChatMembers);
      socket.off("messageHistory", handleMessageHistory);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("messageRead", handleMessageRead);
      socket.off("chatError");
    };
  }, [socket, isConnected]);

  const refreshChatMembers = () => {
    socket?.emit("refreshChatMembers");
  };

  const joinChat = (participant1Id: string, participant2Id: string) => {
    if (!socket) return;

    // Clear previous messages
    setMessages([]);
    setCurrentChatroom(`${participant1Id}-${participant2Id}`);

    socket.emit("joinChat", { participant1Id, participant2Id });
  };

  const sendMessage = (
    senderId: string,
    receiverId: string,
    content: string,
    callback: (response: any) => void
  ) => {
    socket?.emit("sendMessage", { senderId, receiverId, content }, callback);
  };

  const setTyping = (chatroomId: string, isTyping: boolean) => {
    socket?.emit("typing", { chatroomId, isTyping });
  };

  const markAsRead = (messageId: string, chatroomId: string) => {
    socket?.emit("markAsRead", { messageId, chatroomId });
  };

  return {
    messages,
    typingStatus,
    chatMembers,
    currentChatroom,
    refreshChatMembers,
    joinChat,
    sendMessage,
    setTyping,
    markAsRead,
  };
};
