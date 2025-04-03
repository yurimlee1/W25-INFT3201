import React from "react";
import Link from 'next/link';

const navItems = ["Product", "Order", "Repair", "Sign In"];

export const Header = () => {
  return (
    <div className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="bg-transparent absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7 hover:text-blue-500 transition-all duration-300 ease-in-out">
            <Link href="/">Press Start</Link>
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.toLowerCase().trim().replace(/\s+/g, "")}`}
                  className="relative ms-10 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};