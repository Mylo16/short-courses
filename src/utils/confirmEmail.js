// ... (on the /confirm-email page)

import { getAuth } from "firebase/auth"; // Import auth functions
import { getFirestore, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const auth = getAuth();
const db = getFirestore();
const navigate = useNavigate();

export default async function confirmEmail() {
    const user = auth.currentUser;
    if (user) {
        try {
            const tempUserDocRef = doc(db, "tempUsers", user.uid);
            const tempUserDocSnapshot = await getDoc(tempUserDocRef);

            if (tempUserDocSnapshot.exists()) {
                const tempData = tempUserDocSnapshot.data();

                // User confirms email (e.g., button click)
                await updateDoc(tempUserDocRef, { emailFullyVerified: true });

                // Move data to "users" collection
                await setDoc(doc(db, "users", user.uid), tempData);

                // Delete from tempUsers
                await deleteDoc(tempUserDocRef);

                alert("Email confirmed! You can now log in.");
                // Redirect user to login page or appropriate page
                navigate("/login")
            } else {
                alert("User data not found. Please sign up again.");
                // Redirect user to signup page
            }
        } catch (error) {
            console.error("Confirmation error:", error);
            alert("An error occurred during confirmation. Please try again.");
        }
    } else {
        alert("No user is currently signed in.");
        // Redirect user to login or signup page
        navigate('/login');
    }
}

