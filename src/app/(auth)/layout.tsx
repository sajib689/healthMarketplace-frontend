import type { Metadata } from "next";


export const metadata: Metadata = {
    title: {
        default: "Healixity",
        template: "%s | Accounts"
    },
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=" min-h-screen w-full flex items-center justify-center lg:py-20 p-4">
            {children}
        </div>
    );
}
