/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useAuthUser from "@/hooks/useGetMe";
import { TUserInfo } from "@/interfaces/message";
import { useGetAdminQuery } from "@/redux/api/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useChat } from "../../../hooks/useChat";
import MessageBox from "../support/messageBox/MessageBox";



const AdminSupport = () => {
    const { data } = useGetAdminQuery(undefined)
    console.log(data?.data)
    // const [activeUser, setActiveUser] = useState<TUserInfo | null>(demo);
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
            // setActiveUser(user);
            joinChat(currentUserId!, user.id);
            joinedRef.current = userId;
        }
    }, [userId, chatMembers, currentUserId, joinChat]);
    const router = useRouter();
    const handleUserClick = (user: TUserInfo) => {
        router.push(`?user=${user.id}`);
        // setActiveUser(user);
        const id = currentUserId
        console.log(currentUserId!, user.id)
        joinChat(id, user.id);
    };

    useEffect(() => {
        if (currentUserId && data) {

            handleUserClick(data?.data as TUserInfo)
        }
    }, [data, currentUserId])
    return (
        <div className="container my-2 sm:my-4 lg:my-12 h-[80vh]">
            <div className="h-full">
                {/* Chat Box - Full width on mobile when active user is selected */}
                <div
                    className={`${data?.data ? "block" : "hidden xl:block"} h-[80vh] flex flex-col`}
                >
                    {data?.data ? (
                        <div className="flex flex-col h-full">
                            <div className="flex-1">
                                <MessageBox
                                    activeUser={data?.data}
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
                </div>
            </div>
        </div>
    );
};

export default AdminSupport;