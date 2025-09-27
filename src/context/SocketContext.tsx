// context/socket.context.tsx
"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

// const SOCKET_URL = process.env.NEXT_SOCKET_URL;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // console.log("token:", Cookies.get("token"));

  useEffect(() => {
    // Initialize the socket client
    const socketInstance = io("https://api.healixity.com", {
      auth: { token: Cookies.get("token") },
    });

    socketInstance.on("connect", () => {
      console.log("Socket Connected to the server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from the server");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
