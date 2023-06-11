import React from "react";
import { Menu, Transition } from "@headlessui/react";

function Header() {
  return (
    <header className="p-5 leading-6 px-10 text-xl font-[roboto] border-b border-slate-900/10">
      <nav className="relative hidden lg:flex items-center ml-auto justify-between">
        <div className="md:inline text-left cursor-pointer text-xl">
          <span>Visitor Management System </span>
        </div>
        <div className="flex flex-row text-md">
          <NavItems></NavItems>
        </div>
      </nav>
    </header>
  );
}

function NavItems() {
  return (
    <ul className="flex space-x-8 items-center">
      <li>
        <a href="#" className="hover:text-blue-500 duration-500">
          Create User
        </a>
      </li>
      <li>
        <a href="#" className="hover:text-blue-500 duration-500">
          Register Special Visitor
        </a>
      </li>
      <li>
        <a href="#" className="hover:text-blue-500 duration-500">
          Visitations
        </a>
      </li>
      <li>
        <a href="#" className="hover:text-blue-500 duration-500">
          Parcels
        </a>
      </li>
      <li>
        <a href="#" className="hover:text-blue-500 duration-500">
          Registered Visitors
        </a>
      </li>
      <li>
        <UserDropDown></UserDropDown>
      </li>
    </ul>
  );
}

function UserDropDown() {
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
          className="absolute right-0 mt-7 w-40 origin-top-right rounded-md bg-white shadow-lg 
      ring-1 ring-black ring-opacity-10 focus:outline-none px-1 py-1"
        >
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
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function NavPopOver() {}

function ProfileIcon() {
  return (
    <span className="flex items-center hover:text-blue-500 duration-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </span>
  );
}

function NavBarIcon() {
  return (
    <span className="flex items-center hover:text-blue-500 duration-500">
      <svg width="24" height="24" fill="none" aria-hidden="true">
        <path
          d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default Header;
