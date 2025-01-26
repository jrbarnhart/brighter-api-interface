import { createContext } from "react";

export const AuthContext = createContext<{
  accessToken: string;
  setToken: (token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}>({
  accessToken: "",
  setToken: (token: string) => {
    localStorage.setItem("access_token", token);
  },
  logout: () => {
    localStorage.removeItem("access_token");
  },
  isLoggedIn: () => {
    const isLoggedIn: boolean = true;
    return isLoggedIn;
  },
});
