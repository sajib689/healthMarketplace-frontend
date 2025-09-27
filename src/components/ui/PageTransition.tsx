// 'use client';

// import { usePathname } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ReactNode } from 'react';

// interface PageTransitionProps {
//     children: ReactNode;
// }

// export default function PageTransition({ children }: PageTransitionProps) {
//     const pathname = usePathname();

//     return (
//         <AnimatePresence mode="wait">
//             <motion.div
//                 key={`${pathname}-${Math.random()}`} // Ensure unique key
//                 initial={{
//                     clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
//                     opacity: 0
//                 }}
//                 animate={{
//                     clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
//                     opacity: 1
//                 }}
//                 exit={{
//                     clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
//                     opacity: 0
//                 }}
//                 transition={{
//                     clipPath: { duration: 0.2, ease: [0.45, 0.05, 0.55, 0.95] },
//                     opacity: { duration: 0.6, delay: 0.2 }
//                 }}
//                 style={{ overflow: 'hidden' }}
//             >
//                 {children}
//             </motion.div>
//         </AnimatePresence>
//     );
// }










"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Delay showing the page content until the overlay animation is done
        const timeout = setTimeout(() => {
            setShowContent(true);
        }, 400); // Matches the overlay duration
        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <AnimatePresence >
            {/* Page Overlay (Entrance & Exit) */}
            {/* <motion.div
                key={pathname}
                className="fixed inset-0 bg-white z-10"
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.4, ease: [0.45, 0.05, 0.55, 0.95] }}
            /> */}

            {/* Page Content (Appears After Overlay Animation) */}
            {showContent && (
                <motion.div
                    key={`content-${pathname}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-20"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}











// import React, { FC } from "react";
// import { Menu } from "../components/Menu";

// import { motion } from "framer-motion";

// export interface PageProps {
//     title: string;
//     children?: React.ReactNode;
// }

// export const Page: FC<PageProps> = ({ title, children }) => {
//     return (
// <motion.div
//     key="page"
//     initial={{ x: "20%", opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     exit={{ x: "-20%", opacity: 0, transition: { duration: 0.2 } }}
//     transition={{ delay: 0, duration: 0.2 }}
// >
//     <h1>{title}</h1>
//     <Menu />

//     <div>{children}</div>
// </motion.div>
//     );
// };
