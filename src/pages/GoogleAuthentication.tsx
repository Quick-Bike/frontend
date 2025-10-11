// Install package: npm install @react-oauth/google axios

// import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

const clientId =
  "202588708462-d2fgc9h4uskv3sehqscjve1akink49r8.apps.googleusercontent.com";
// const clientId = "YOUR_GOOGLE_CLIENT_ID";

function GoogleAuthentication() {
  // Called on Google login success
  const onSuccess = async (credentialResponse) => {
    try {
      // Send Google ID token to backend for verification & login/signup
      // const res = await axios.post("/api/auth/google-login", {
      //   idToken: credentialResponse.credential,
      // });
      console.log("User logged in:", credentialResponse);
      // Save your app token (e.g., JWT) for auth in localStorage or context here
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const onError = () => {
    console.error("Google Sign In Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <h1>Sign In with Google</h1>
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuthentication;
