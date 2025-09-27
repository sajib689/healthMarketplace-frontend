import { Button } from "@/components/ui/button"
import { Search, MessageCircle } from "lucide-react"
import Image from "next/image"

interface ChatMessage {
    id: string
    name: string
    avatar: string
    message: string
    time: string
    isNew?: boolean
}

const messages: ChatMessage[] = [
    {
        id: "1",
        name: "Robert Fox",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        message: "Hi, i want make enquiries abou...",
        time: "12:55 am",
        isNew: true,
    },
    {
        id: "2",
        name: "Guy Hawkins",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        message: "Hi, i want make enquiries abou...",
        time: "12:55 am",
    },
    // Add more messages as needed
]

export default function ChatInterface() {
    return (
        <div className="flex h-screen bg-background">
            {/* Left Panel - Chat List */}
            <div className="w-full md:w-80 border-r flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-semibold mb-4">Message</h1>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input placeholder="Search" className="pl-8" />
                    </div>
                </div>

                <div className="overflow-y-auto flex-1">
                    {messages.map((chat) => (
                        <button
                            key={chat.id}
                            className="w-full text-left p-4 hover:bg-accent transition-colors border-b flex items-start space-x-3"
                        >
                            <div className="relative h-10 w-10 flex-shrink-0">
                                <Image
                                    src={chat.avatar || "/placeholder.svg"}
                                    alt={chat.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">{chat.name}</span>
                                        {chat.isNew && (
                                            <div className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                                                New
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Panel - Empty State */}
            <div className="hidden md:flex flex-1 items-center justify-center flex-col text-center p-8">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Messages</h2>
                <p className="text-sm text-muted-foreground mb-4">Click on a contact to view messages</p>
                <Button className="bg-blue-500 hover:bg-blue-600">New Message</Button>
            </div>
        </div>
    )
}

