import React, { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

export default function Authentication({ onLogin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        onSuccess: async () => {
          setIsAuthenticated(true);
          onLogin(true);
        },
        onError: (error) => {
          console.error("Login failed", error);
        }
      });
    } catch (error) {
      console.error("Authentication error", error);
    }
  };

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <p>✅ Logged in successfully!</p>
      ) : (
        <button onClick={handleLogin}>Login with Internet Identity</button>
      )}
    </div>
  );
}