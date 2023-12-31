"use client";

import moment from "moment";
import { React, useState, useEffect } from "react";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { useRouter } from "next/navigation";

import { auth, db } from "firebase.js";
import {
  collection,
  addDoc,
  doc,
  collectionGroup,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

export default function RegisterVisitor() {
  const [visitorName, setVisitorName] = useState("");
  const [visitorIC, setVisitorIC] = useState("");
  const [visitorCarPlate, setVisitorCarPlate] = useState("");
  const [visitorTelNo, setVisitorTelNo] = useState("");
  const [visitorVisitDateTime, setVisitorVisitDateTime] = useState("");
  const [visitorVisitPurpose, setVisitorVisitPurpose] = useState("");
  const [visitingUnit, setVisitingUnit] = useState("");
  const [residentTelNo, setResidentTelNo] = useState("");
  const [residentUserID, setResidentUserID] = useState("");
  const [residentName, setResidentName] = useState("");

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
    readOnly: true,
    className:
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  };

  useEffect(() => {
    if (residentUserID) {
      addVisitor();
    }
  }, [residentUserID, residentName]);

  async function addVisitor() {
    try {
      const userDocRef = doc(db, "users", residentUserID);

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
        visitorVisitingUnit: visitingUnit,
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
        setVisitingUnit("");
        setResidentTelNo("");

        alert("Visitor added successfully under resident " + residentName);
        // router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function findResident() {
    if (
      visitorName.trim() === "" ||
      visitorIC.trim() === "" ||
      visitorCarPlate.trim() === "" ||
      visitorTelNo.trim() === "" ||
      visitorVisitDateTime.trim() === "" ||
      visitorVisitPurpose.trim() === "" ||
      visitingUnit.trim() === "" ||
      residentTelNo.trim() === ""
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const q = query(
      collectionGroup(db, "users"),
      where("residentUnit", "==", visitingUnit),
      where("residentTelNo", "==", residentTelNo)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert(
        "Resident not found. Please enter the correct resident unit and phone number"
      );
      return;
    }
    querySnapshot.forEach(async (doc) => {
      setResidentUserID(doc.id);
      setResidentName(doc.data().residentName);
    });
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-30 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Visitor
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:mx-auto">
          <div className="space-y-6 w-full">
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
                    // onChange={(e) => setVisitorName(e.target.value)}
                    onChange={(e) =>
                      setVisitorName(
                        e.target.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase()
                      )
                    }
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
                    onChange={(e) =>
                      setVisitorIC(e.target.value.replace(/[^0-9]/g, ""))
                    }
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
                    onChange={(e) =>
                      setVisitorCarPlate(e.target.value.toUpperCase())
                    }
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
                    onChange={(e) =>
                      setVisitorTelNo(e.target.value.replace(/[^0-9]/g, ""))
                    }
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
                    onChange={(e) =>
                      setVisitorVisitPurpose(e.target.value.toUpperCase())
                    }
                    value={visitorVisitPurpose}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-10">
              <div>
                <label
                  htmlFor="visitingUnit"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Visiting Unit
                </label>
                <div className="mt-2">
                  <input
                    id="visitingUnit"
                    name="visitingUnit"
                    type="text"
                    autoComplete="text"
                    required
                    onChange={(e) =>
                      setVisitingUnit(e.target.value.toUpperCase())
                    }
                    value={visitingUnit}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="residentTelNo"
                  className="block text-sm font-medium leading-6 text-gray-900 flex"
                >
                  Resident's Telephone Number
                </label>
                <div className="mt-2 flex">
                  <input
                    id="residentTelNo"
                    name="residentTelNo"
                    type="text"
                    autoComplete="tel"
                    required
                    onChange={(e) =>
                      setResidentTelNo(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    value={residentTelNo}
                    className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={findResident}
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
