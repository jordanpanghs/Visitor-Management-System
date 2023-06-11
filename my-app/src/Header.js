import React from "react";

function Header() {
  return (
    <header className="flex flex-row justify-between bg-blue-500 text-white p-5 font-semibold leading-6 px-10">
      <div className="text-left">
        <span>Visitor Management System </span>
      </div>
      <div className="">
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
            <button>
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
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
