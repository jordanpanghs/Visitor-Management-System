"use client";

import moment from "moment";
import React from "react";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function RegisterSpecialVisitor() {
  var yesterday = moment().subtract(1, "day");
  function valid(current) {
    return current.isAfter(yesterday);
  }

  let inputProps = {
    className:
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Special Visitor
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div className="flex items-center justify-between space-x-10">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="icNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Identity Card Number
                </label>
                <div className="mt-2">
                  <input
                    id="icNumber"
                    name="icNumber"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-10">
              <div>
                <label
                  htmlFor="plateNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Car Plate Number
                </label>
                <div className="mt-2">
                  <input
                    id="plateNumber"
                    name="plateNumber"
                    type="text"
                    autoComplete="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="telephoneNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Telephone Number
                </label>
                <div className="mt-2">
                  <input
                    id="telephoneNumber"
                    name="telephoneNumber"
                    type="text"
                    autoComplete="tel"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-10">
              <div>
                <label
                  htmlFor="visitDateTime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Visiting Date & Time
                </label>
                <div className="mt-2">
                  <Datetime
                    inputProps={inputProps}
                    isValidDate={valid}
                    id="visitDateTime"
                    name="visitDateTime"
                    type="time"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="visitPurpose"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Visiting Purpose
                </label>
                <div className="mt-2">
                  <input
                    id="visitPurpose"
                    name="visitPurpose"
                    type="text"
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
