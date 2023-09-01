import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function EditAccount() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  async function handleSubmit() {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    console.log(currentPassword, password, confirmPassword);

    try {
      setError("");
      setLoading(true);

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );

      reauthenticateWithCredential(currentUser, credential)
        .then(() => {
          updatePassword(currentUser, password)
            .then(() => {
              alert("Password updated successfully!");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setError("Incorrect current password");
          console.log(error);
        });
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      setError("Failed to update password");
    }
    setLoading(false);
  }

  return (
    <div className="flex-1 flex-col justify-center px-6 lg:px-8">
      <h1 className="mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Change Your Account Password
      </h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        {error && (
          <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">
            {error}
          </div>
        )}
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Current Password
          </label>

          <div className="mt-2">
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            New Password
          </label>

          <div className="mt-2">
            <input
              type="password"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm New Password
          </label>

          <div className="mt-2">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
