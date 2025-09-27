import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import Logo from "../navbar/Logo";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-primary/20 py-8 ">
      <div className="container space-y-8">
        {/* Logo and Contact Info */}
        <div className="md:space-y-12 space-y-10">
          <Logo />

          <div className="space-y-[9px]">
            <p className="text-black text-3xl md:text-4xl  font-bold">
              contact@healixity.com
            </p>
            <p className="text-text_shadow">
              2125 Biscayne Blvd, Ste 204 #22040 Miami, FL 33137
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link
              href="https://m.facebook.com/profile.php?id=100064490736083&name=xhp_nt__fb__action__open_user"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary  p-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <Facebook className="w-7 md:w-8 h-7 md:h-8 text-white max-w-7 max-h-7" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://www.instagram.com/healixity/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary  p-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-7 md:w-8 h-7 md:h-8 text-white max-w-7 max-h-7" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://x.com/healixity?s=21&t=QJsRmO9iQ-ISzBsGyJnweQ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary  p-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <BsTwitterX className="w-7 md:w-8 h-7 md:h-8 text-white max-w-7 max-h-7" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/healixity/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary  p-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <FaLinkedin className="w-7 md:w-8 h-7 md:h-8 text-white max-w-7 max-h-7" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link href="/" className="text-gray-900 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/project"
                  className="text-gray-900 hover:text-black"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-900 hover:text-black">
                  Job Listing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-900 hover:text-black">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-900 hover:text-black"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-900 hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-vlack text-sm">
            Copyright © 2025 HEALIXITY LLC All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
