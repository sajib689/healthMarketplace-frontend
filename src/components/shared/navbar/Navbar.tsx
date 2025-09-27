"use client";

import { useSocket } from "@/context/SocketContext";
import MainNotifications from "@/feature/notification/MainNotifications";
import useAuthUser from "@/hooks/useGetMe";
import { BellRing, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PrimaryButton from "../primaryButton/PrimaryButton";
import Logo from "./Logo";
import { UserPlaceholder } from "@/lib/placeholder";

export const navItems = [
  {
    name: "Marketplace",
    subLink: [
      { name: "Explore Projects", link: "/project" },
      { name: "Explore Experts", link: "/experts" },
    ],
  },
  {
    name: "Job Listing",
    subLink: [
      { name: "Explore All Jobs", link: "/jobs" },
      { name: "My Applied Jobs", link: "/applied-jobs" },
    ],
  },
  {
    name: "FAQ",
    link: "/faq",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [fetch, setFetch] = useState(true);

  const { socket } = useSocket();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { user, profileLinks, handleLogout } = useAuthUser();

  useEffect(() => {
    if (!socket) return;

    // Unread count listener
    socket.on("unread_notifications_count", (count: number) => {
      setUnreadCount(count);
    });

    // Errors
    socket.on("notification_error", (error) => {
      console.error("Notification error:", error);
    });

    return () => {
      socket.off("unread_notifications_count");
      socket.off("allNotificationsRead");
    };
  }, [socket]);

  // console.log(user);

  const getLinkClass = (path: string) =>
    pathname === path
      ? "max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:after:absolute lg:after:bg-primary lg:after:w-full lg:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300 text-primary text-nowrap text-lg text-nowrap font-semibold"
      : "max-lg:border-b max-lg:py-3 max-lg:px-3 relative lg:hover:after:absolute lg:after:bg-primary lg:after:w-0 lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300 hover:text-primary text-nowrap text-lg text-nowrap ";

  return (
    <div className="container py-4 ">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="lg:flex flex-1 items-center justify-center lg:gap-12 xl:gap-16 2xl:gap-20 hidden">
          <ul className="flex items-center lg:gap-12 xl:gap-13 md:gap-8 relative">
            {navItems.map((item, idx) => (
              <li key={idx} className="relative group">
                {item.subLink ? (
                  <>
                    <span className="cursor-pointer group-hover:text-primary text-lg flex items-center ">
                      {item.name}{" "}
                      <ChevronDown className="w-4 h-4 mt-1 group-hover:rotate-180 transition-all duration-300 text-nowrap" />
                    </span>

                    <div className="absolute transform origin-top-left scale-0 group-hover:scale-100  transition-transform  top-full -left-2/3 flex flex-col gap-2 p-7 min-w-48 rounded-lg  text-black bg-transparent z-50 ">
                      <div className=" navSubLinkTwo  bg-slate-200 p-[1px]  ">
                        <div className=" navSubLinkTwo  bg-slate-100 p-[2px]  ">
                          <div className=" navSubLinkTwo  bg-slate-50 p-[3px]  ">
                            <ul className=" bg-white  navSubLinkTwo ">
                              <div className="px-5 py-4">
                                {item.subLink.map((sub, subIdx) => (
                                  <li key={subIdx} className="mt-1">
                                    <Link
                                      href={sub.link}
                                      className={getLinkClass(sub.link)}
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.link} className={getLinkClass(item.link)}>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* User Dropdown */}
        <div className="flex items-center justify-end gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <PrimaryButton onClick={() => handleLogout()} text="Sign Out" />
              </div>

              <button
                onMouseEnter={() => setFetch((prev) => !prev)}
                className="relative group  "
              >
                <div>
                  {/* <Link href="/notifications" className="sr-only"> */}
                  <BellRing onClick={() => console.log("cliekced")} className="w-7 h-7 z-50" />
                  <div className="absolute -top-2 right-0">
                    <p className="bg-primary py-[2px] px-1 text-sm rounded-full">
                      {unreadCount}
                    </p>
                  </div>
                </div>
                <div className="absolute transform origin-top-left scale-0 group-hover:scale-100 transition-transform top-full -left-48 flex flex-col gap-2 p-4 min-w-72 lg:min-w-80 rounded-lg text-black bg-transparent z-50">
                  <div className="navSubLink bg-slate-200 p-[1px]">
                    <div className="navSubLink bg-slate-100 p-[2px]">
                      <div className="navSubLink bg-slate-50 p-[3px]">
                        <ul className="bg-white navSubLink">
                          <MainNotifications
                            // setUnread={setUnread}
                            fetch={fetch}
                          />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <div className="relative group">
                <Image
                  alt="Profile"
                  src={
                    user?.profilePicture || UserPlaceholder.src
                  }
                  width={400}
                  height={400}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="absolute transform origin-top-left scale-0 group-hover:scale-100  transition-transform  top-10 -left-[110PX] lg:-left-24 flex flex-col gap-2 p-3 lg:p-4 min-w-28 md:min-w-36 lg:min-w-52 rounded-lg  text-black bg-transparent z-50 ">
                  <div className=" navSubLink  bg-slate-200 p-[1px] ">
                    <div className=" navSubLink  bg-slate-100 p-[1px]  ">
                      <div className=" navSubLink  bg-slate-50 p-[2px]  ">
                        <ul className=" bg-white  navSubLink ">
                          <div className="md:px-4 px-2 pt-4 pb-2">
                            {profileLinks.map((sub, subIdx) => (
                              <li key={subIdx} className="mt-2">
                                <Link
                                  href={sub.link}
                                  className={getLinkClass(sub.link)}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href={"/signIn"}>
                <PrimaryButton onClick={() => { }} text="Sign In" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
