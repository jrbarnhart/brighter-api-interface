import { createContext, useState } from "react";

const AuthContext = createContext({
  accessToken: "",
  setToken: (token: string) => {
    localStorage.setItem("access_token", token);
  },
  logout: () => {
    localStorage.removeItem("access_token");
  },
});

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
