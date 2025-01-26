import { createContext } from "react";

export const AuthContext = createContext({
  accessToken: "",
  setToken: (token: string) => {
    localStorage.setItem("access_token", token);
  },
  logout: () => {
    localStorage.removeItem("access_token");
  },
});
