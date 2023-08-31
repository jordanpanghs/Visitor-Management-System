import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [userIsSecurity, setUserIsSecurity] = useState(null);
  const [userResidentUnit, setUserResidentUnit] = useState(null);
  const [userIsAdmin, setUserIsAdmin] = useState(null);

  //Creates user and updates their display name
  function signup(name, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        });
      })
      .catch((error) => {
        alert("Error creating user:", error);
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    signOut(auth);
    return router.push("/login");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserIsSecurity(userData.isSecurity);
          setUserResidentUnit(userData.residentUnit);
          setUserIsAdmin(userData.isAdmin);
        }
        setLoading(false);
      } else {
        setUserIsSecurity(false);
        setUserResidentUnit(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userIsAdmin,
    userIsSecurity,
    userResidentUnit,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
