import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBgw81HICGQ9gN5ItZngqvytntzyW8S5eY",
    authDomain: "growinfinity-4701b.firebaseapp.com",
    projectId: "growinfinity-4701b",
    storageBucket: "growinfinity-4701b.firebasestorage.app",
    messagingSenderId: "696607400610",
    appId: "1:696607400610:web:f3828be8d61db6d1306dfb",
    measurementId: "G-L267W3PZW7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🚨 Disable reCAPTCHA verification ONLY in development mode
if (window.location.hostname === "localhost") {
    auth.settings.appVerificationDisabledForTesting = true;
}

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
