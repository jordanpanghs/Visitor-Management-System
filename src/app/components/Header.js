"use client";

import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

function Header() {
  const navItems = NavItems();

  const { login, signup, currentUser } = useAuth();

  return (
    <header className="bg-white min-w-screen-sm p-5 sticky top-0 z-40 leading-6 px-20 text-xl font-[Roboto] border-b border-slate-900/10">
      <nav className="flex-row flex relative items-center ml-auto justify-between">
        <div className="inline text-left cursor-pointer text-lg">
          <Link href="/">
            <span>Visitor Management System </span>
          </Link>
        </div>
        <div className="flex flex-row text-base items-center">
          <ul className="hidden lg:flex space-x-8 mr-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className="hover:text-blue-500 duration-500"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="lg:hidden items-center flex flex-row mr-8">
            <NavDropDown navItems={navItems} />
          </ul>

          <UserDropDown />
        </div>
      </nav>
    </header>
  );
}

function NavItems() {
  //Navigation Link Items
  return [
    { id: 3, text: "Visits", link: "/" },
    { id: 4, text: "Parcels", link: "#" },
    {
      id: 2,
      text: "Register Visitor",
      link: "/register/specialvisitor",
    },
    { id: 1, text: "Create User", link: "#" },
  ];
}

function UserDropDown() {
  const { logout, currentUser } = useAuth();

  const names = () => {
    if (currentUser && currentUser.displayName) {
      const nameArr = currentUser.displayName.split(" ");
      return nameArr[0];
    }
    return "";
  };

  return (
    <Menu>
      <Menu.Button>
        <ProfileIcon></ProfileIcon>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className="absolute right-0 mt-11 w-40 origin-top-right rounded-md bg-white shadow-lg 
      ring-1 ring-black ring-opacity-10 focus:outline-none px-1 py-1"
        >
          <Menu.Item>
            {({ active }) => (
              <div className="group flex w-full justify-center rounded-md px-2 py-2 text-sm">
                Hello, {names()}
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-blue-400 text-white" : "text-gray-900"
                } group flex w-full justify-center rounded-md px-2 py-2 text-sm`}
              >
                <a className="" href="#">
                  Account settings
                </a>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-blue-400 text-white" : "text-gray-900"
                } group flex w-full justify-center rounded-md px-2 py-2 text-sm`}
              >
                <a className="" href="#">
                  Account settings
                </a>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => logout()}
                className={`${
                  active ? "bg-blue-400 text-white" : "text-gray-900"
                } group flex w-full justify-center rounded-md px-2 py-2 text-sm`}
              >
                <a className="" href="#">
                  Logout
                </a>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function NavDropDown({ navItems }) {
  //To render dropdown navigation link for small screen size
  return (
    <Menu>
      <Menu.Button>
        <NavBarIcon></NavBarIcon>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className="absolute right-0 mt-11 w-60 origin-top-right rounded-md bg-white shadow-lg 
      ring-1 ring-black ring-opacity-10 focus:outline-none px-1 py-1"
        >
          {navItems.map((item) => (
            <Menu.Item key={item.id}>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-400 text-white" : "text-gray-900"
                  } group flex w-full justify-center rounded-md px-2 py-2 text-sm`}
                >
                  <a href={item.link}>{item.text}</a>
                </button>
              )}
            </Menu.Item>
          ))}

          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-blue-400 text-white" : "text-gray-900"
                } group flex w-full justify-center rounded-md px-2 py-2 text-sm`}
              >
                <a className="" href="#">
                  Create User
                </a>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function ProfileIcon() {
  //SVG for avatar icon
  return (
    <span className="flex items-center hover:text-blue-500 duration-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </span>
  );
}

function NavBarIcon() {
  //SVG for dropdown icon
  return (
    <span className="flex items-center hover:text-blue-500 duration-500">
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
      >
        <path
          d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z"
          fill="#000000"
        />
        <path
          d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
          fill="#000000"
        />
        <path
          d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
          fill="#000000"
        />
      </svg>
    </span>
  );
}

export default Header;
