"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BsPersonVideo } from "react-icons/bs"
import { HiOutlineNewspaper } from "react-icons/hi"
import { LiaBriefcaseSolid } from "react-icons/lia"
import { RiProjectorLine } from "react-icons/ri"
import { TiMessages } from "react-icons/ti"

const navItems = [
    { icon: RiProjectorLine, label: "Projects", href: "/project" },
    { icon: BsPersonVideo, label: "Consultation", href: "/experts" },
    { icon: LiaBriefcaseSolid, label: "Jobs", href: "/jobs" },
    { icon: TiMessages, label: "Messages", href: "/messaging" },
    { icon: HiOutlineNewspaper, label: "Blogs", href: "/blog" },
]

const BottomNavbar = () => {
    const pathname = usePathname()
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false) // Hide navbar when scrolling down
            } else {
                setShowNavbar(true) // Show navbar when scrolling up
            }
            setLastScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    return (
        <nav
            className={`fixed z-50 bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-300 lg:hidden transition-transform duration-300 ${showNavbar ? "translate-y-0" : "translate-y-full"
                }`}
        >
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-200 ${isActive ? "text-primary" : "text-gray-700"
                                } group`}
                        >
                            <item.icon className="h-7 w-7 group-hover:scale-110 transition-transform duration-200 " />
                            <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                            {isActive && <div className="h-1 w-8 bg-primary rounded-full mt-1"></div>}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default BottomNavbar
