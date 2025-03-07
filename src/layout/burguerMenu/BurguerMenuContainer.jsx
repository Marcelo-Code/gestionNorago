import { useContext, useState } from "react";
import { BurguerMenu } from "./BurguerMenu";
import { GeneralContext } from "../../context/GeneralContext";

export const BurguerMenuContainer = () => {
  const { darkMode } = useContext(GeneralContext);

  //Lógica para cerrar el menú luego de hacer click en algunas de las opciones
  //--------------------------------------------------------------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const handleStateChange = (state) => setMenuOpen(state.isOpen);
  const closeMenu = () => setMenuOpen(false);

  const burguerMenuProps = {
    darkMode,
    closeMenu,
    menuOpen,
    handleStateChange,
  };

  return <BurguerMenu {...burguerMenuProps} />;
};
