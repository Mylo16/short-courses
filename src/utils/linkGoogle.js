import { signInWithPopup, linkWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";

async function linkGoogle() {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found.");

    // Sign in with Google
    const googleResult = await signInWithPopup(auth, provider);
    const googleCredential = GoogleAuthProvider.credentialFromResult(googleResult);

    // Link Google account to the existing user
    await linkWithCredential(user, googleCredential);

    return { success: true, message: "Google linked successfully" };
  } catch (error) {
    console.error("Linking Error:", error.message);
    return { error: error.message };
  }
}

export default linkGoogle;
