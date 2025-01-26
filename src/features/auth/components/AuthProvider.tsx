import { useState } from "react";
import { AuthContext } from "./AuthContext";

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

  return (
    <AuthContext.Provider value={{ accessToken, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
