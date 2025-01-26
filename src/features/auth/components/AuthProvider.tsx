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
    const decodedToken = jwtDecode(accessToken);
    const today = new Date();
    const isTokenExpired = (decodedToken.exp || 0) < today.getTime();
    return !isTokenExpired;
  };

  return (
    <AuthContext.Provider value={{ accessToken, setToken, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
