/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const changeMode = () => setDarkMode(!darkMode);

  const data = {
    darkMode,
    changeMode,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
