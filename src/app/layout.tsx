import type { Metadata } from "next";
import { dmSans, robotoFlex } from "./fonts/font";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReduxProvider from "@/redux/Provider";
import { Toaster } from "sonner";
import { SocketProvider } from "@/context/SocketContext";

export const metadata: Metadata = {
  title: {
    default: "Healixity",
    template: "%s | Healixity ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light"
      className="js-focus-visible"
      data-js-focus-visible="">
      <body
        suppressHydrationWarning={true}
        className={`${dmSans.variable} ${robotoFlex.variable} antialiased `}
      >
        <ReduxProvider>
          <SocketProvider>
            <Toaster position="top-center" expand={true} richColors />
            <AntdRegistry>{children}</AntdRegistry>
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html >
  );
}
