"use client";

import moment from "moment";
import { React, useState } from "react";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { useRouter } from "next/navigation";

import { auth, db } from "firebase.js";
import { collection, addDoc, doc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

export default function RegisterVisitor() {
  const [visitorName, setVisitorName] = useState("");
  const [visitorIC, setVisitorIC] = useState("");
  const [visitorCarPlate, setVisitorCarPlate] = useState("");
  const [visitorTelNo, setVisitorTelNo] = useState("");
  const [visitorVisitDateTime, setVisitorVisitDateTime] = useState("");
  const [visitorVisitPurpose, setVisitorVisitPurpose] = useState("");

  const { currentUser, userResidentUnit } = useAuth();

  const router = useRouter();

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

  function addVisitor() {
    if (
      visitorName.trim() === "" ||
      visitorIC.trim() === "" ||
      visitorCarPlate.trim() === "" ||
      visitorTelNo.trim() === "" ||
      visitorVisitDateTime.trim() === "" ||
      visitorVisitPurpose.trim() === ""
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);

    const userRegisteredVisitorsRef = collection(
      userDocRef,
      "userRegisteredVisitors"
    );
    addDoc(userRegisteredVisitorsRef, {
      //add visitor id according to the number of documents in the collection
      visitorName: visitorName,
      visitorIC: visitorIC,
      visitorCarPlate: visitorCarPlate,
      visitorTelNo: visitorTelNo,
      visitorVisitDateTime: visitorVisitDateTime,
      visitorVisitPurpose: visitorVisitPurpose,
      visitorVisitingUnit: userResidentUnit,
      isCheckedIn: false,
      isCheckedOut: false,
      entryTime: "",
      exitTime: "",
      hasVisited: false,
    }).then(() => {
      setVisitorName("");
      setVisitorIC("");
      setVisitorCarPlate("");
      setVisitorTelNo("");
      setVisitorVisitDateTime("");
      setVisitorVisitPurpose("");

      alert("Added successfully");
      // router.push("/");
    });
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Visitor
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
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
                    value={visitorName}
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
                    value={visitorIC}
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
                    value={visitorCarPlate}
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
                    value={visitorTelNo}
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
                    onChange={(momentObj) => {
                      const selectedDateTime = momentObj
                        ? momentObj.toJSON()
                        : null;
                      setVisitorVisitDateTime(selectedDateTime);
                    }}
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
                    value={visitorVisitPurpose}
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
          </div>
        </div>
      </div>
    </>
  );
}
