/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const changeMode = () => setDarkMode(!darkMode);
  const data = {
    darkMode,
    changeMode,
  };
  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
