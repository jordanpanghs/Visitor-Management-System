import React from "react";
import { Menu, Transition } from "@headlessui/react";

function Header() {
  return (
    <header className="flex flex-row justify-between bg-blue-500 text-white p-5 font-semibold leading-6 px-10">
      <div className="text-left">
        <span>Visitor Management System </span>
      </div>
      <div className="">
        <NavItems></NavItems>
      </div>
    </header>
  );
}

export function NavItems() {
  return (
    <ul className="flex align-center space-x-10">
      <li>
        <a href="#">Create User</a>
      </li>
      <li>
        <a href="#">Register Special Visitor</a>
      </li>
      <li>
        <a href="#">Visitations</a>
      </li>
      <li>
        <a href="#">Parcels</a>
      </li>
      <li>
        <a href="#">Registered Visitors</a>
      </li>
      <li>
        <NavDropDown></NavDropDown>
      </li>
    </ul>
  );
}

function NavDropDown() {
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

function ProfileIcon() {
  return (
    <span className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
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

export default Header;
