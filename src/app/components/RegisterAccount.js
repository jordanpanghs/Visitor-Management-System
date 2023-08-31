import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { secondaryAuth, db } from "firebase.js";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export default function RegisterAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("resident");
  const [residentUnit, setResidentUnit] = useState("");
  const [residentTelNo, setResidentTelNo] = useState("");
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const [newUserID, setNewUserID] = useState("");

  const {} = useAuth();

  async function submitHandler() {
    if (!name || !email || !password || !userType) {
      setError("Please fill in all fields");
      alert("lmfao");
      return;
    }

    await createUserWithEmailAndPassword(secondaryAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        });
      })
      .catch((error) => {
        alert(error);
      });

    try {
      const userDocRef = doc(db, "users", secondaryAuth.currentUser.uid);
      if (userType === "resident") {
        await setDoc(userDocRef, {
          isAdmin: false,
          isSecurity: false,
          residentName: name,
          residentUnit: residentUnit,
          residentTelNo: residentTelNo,
        });
      } else if (userType === "security") {
        await setDoc(userDocRef, {
          isSecurity: true,
          isAdmin: false,
        });
      } else if (userType === "admin") {
        await setDoc(userDocRef, {
          isSecurity: false,
          isAdmin: true,
        });
      }
      alert("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setUserType("resident");
      setResidentUnit("");
      setResidentTelNo("");
      setNewUserID("");
      signOut(secondaryAuth);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex-1 flex-col justify-center px-6 lg:px-8">
      <h1 className="mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create a New User Account
      </h1>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <div>
          {error && (
            <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">
              {error}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Full Name
          </label>

          <div className="mt-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">User Type</label>
          <div className="mt-2 flex row gap-5">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="resident"
                  checked={userType === "resident"}
                  onChange={() => setUserType("resident")}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">Resident</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="security"
                  checked={userType === "security"}
                  onChange={() => setUserType("security")}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">Security</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={() => setUserType("admin")}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>
            </div>
          </div>
        </div>

        {userType === "resident" && (
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="residentUnit"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Resident's Unit
              </label>
            </div>
            <div className="mt-2">
              <input
                value={residentUnit}
                onChange={(e) => setResidentUnit(e.target.value)}
                name="residentUnit"
                type="text"
                placeholder="Resident's Unit"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}

        {userType === "resident" && (
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="residentTelNo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Resident's Phone Number
              </label>
            </div>
            <div className="mt-2">
              <input
                value={residentTelNo}
                onChange={(e) => setResidentTelNo(e.target.value)}
                name="residentTelNo"
                type="text"
                placeholder="Resident's Phone Number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        )}

        <div>
          <button
            onClick={submitHandler}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <h2 className="relative z-20">SUBMIT</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
