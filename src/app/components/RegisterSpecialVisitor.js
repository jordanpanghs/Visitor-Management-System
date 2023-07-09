"use client";

import moment from "moment";
import { React, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { auth, db } from "firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default function RegisterSpecialVisitor() {
  const [visitorName, setVisitorName] = useState("");
  const [visitorIC, setVisitorIC] = useState("");
  const [visitorCarPlate, setVisitorCarPlate] = useState("");
  const [visitorTelNo, setVisitorTelNo] = useState("");
  const [visitorVisitDateTime, setVisitorVisitDateTime] = useState("");
  const [visitorVisitPurpose, setVisitorVisitPurpose] = useState("");

  //To prevent past dates from being picked
  var yesterday = moment().subtract(1, "day");
  function valid(current) {
    return current.isAfter(yesterday);
  }

  let inputProps = {
    id: "visitDateTime",
    name: "visitDateTime",
    className:
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  };

  async function addVisitor() {
    const dbInstance = collection(db, "registeredVisitors");
    await addDoc(dbInstance, {
      visitorName: visitorName,
      visitorIC: visitorIC,
      visitorCarPlate: visitorCarPlate,
      visitorTelNo: visitorTelNo,
      visitorVisitDateTime: visitorVisitDateTime,
      visitorVisitPurpose: visitorVisitPurpose,
    }).then(() => {
      setVisitorName("");
      setVisitorIC("");
      setVisitorCarPlate("");
      setVisitorTelNo("");
      setVisitorVisitDateTime("");
      setVisitorVisitPurpose("");
    });
  }

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
        {console.log(collection(db, "registeredVisitors"))}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#">
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
                    onChange={(e) => setVisitorName(e.target.value)}
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
                    onChange={(e) => setVisitorIC(e.target.value)}
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
                    onChange={(e) => setVisitorCarPlate(e.target.value)}
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
                    onChange={(e) => setVisitorTelNo(e.target.value)}
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
                    onChange={(e) => setVisitorVisitDateTime(e.toJSON())}
                    inputProps={inputProps}
                    isValidDate={valid}
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
                    onChange={(e) => setVisitorVisitPurpose(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                // type="submit"
                onClick={addVisitor}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register Visitor
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
