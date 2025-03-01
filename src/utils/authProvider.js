import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload();

          if (!firebaseUser.emailVerified) {
            await signOut(auth);
            setUser(null);
            setLoading(false);
            return;
          }

          const tempUserRef = doc(db, "tempUsers", firebaseUser.uid);
          const tempUserSnap = await getDoc(tempUserRef);

          if (tempUserSnap.exists()) {
            const tempData = tempUserSnap.data() || {};

            await setDoc(doc(db, "users", firebaseUser.uid), {
              firstName: tempData.firstName || "",
              lastName: tempData.lastName || "",
              email: tempData.email || firebaseUser.email,
              role: tempData.role || "student",
              phone: tempData.phone || "",
            });

            await deleteDoc(tempUserRef);
          }

          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userSnap.data() });
          } else {
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
    } catch (error) {
      alert(`Logout Error: ${error}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
