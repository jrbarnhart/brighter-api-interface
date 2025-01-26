import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState("");

  const setToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("access_token", token);
  };

  const logout = () => {
    setAccessToken("");
    localStorage.removeItem("access_token");
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const today = new Date();
      const currentTimeInSeconds = Math.floor(today.getTime() / 1000); // Convert to seconds
      const isTokenExpired = (decodedToken.exp ?? 0) < currentTimeInSeconds;
      return !isTokenExpired;
    } catch (error) {
      // Handle invalid tokens (e.g., malformed token)
      console.error("Error decoding token:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, setToken, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
