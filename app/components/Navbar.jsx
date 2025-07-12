"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SlReload } from "react-icons/sl";

// Active class for active route
const getLinkClass = (path, currentPath) =>
  path === currentPath
    ? "bg-[#1F1F1F] text-white font-semibold rounded"
    : "hover:bg-[#111] hover:text-white rounded";

const Navbar = () => {
  // getting the current pathname
  const pathname = usePathname();

  return (
    // I used daisy ui (tailwind based component library) for this navbar
    <div className=" bg-[#0A0A0A] shadow-sm p-2 lg:p-0">
      <div className="flex items-center container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/" className={getLinkClass("/", pathname)}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/user_a"
                  className={getLinkClass("/pages/user_a", pathname)}
                >
                  User-A (Location Sender)
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/user_b"
                  className={getLinkClass("/pages/user_b", pathname)}
                  target="_blank"
                >
                  User-B (Map)
                </Link>
              </li>
              <li>
                <Link
                  href="/users"
                  className={getLinkClass("/users", pathname)}
                >
                  Users
                </Link>
              </li>
            </ul>
          </div>
          <a className="text-base md:text-xl xl:text-3xl font-bold">Live Location Reader</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link href="/" className={getLinkClass("/", pathname)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pages/user_a"
                className={getLinkClass("/pages/user_a", pathname)}
              >
                User-A (Location Sender)
              </Link>
            </li>
            <li>
              <Link
                href="/pages/user_b"
                className={getLinkClass("/pages/user_b", pathname)}
                target="_blank"
              >
                User-B (Map)
              </Link>
            </li>
            <li>
              <Link href="/users" className={getLinkClass("/users", pathname)}>
                Users
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end ">
          <a
            href={pathname}
            className="btn tooltip tooltip-left "
            data-tip="Reload"
          >
            <SlReload />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
