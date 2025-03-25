import { slide as Menu } from "react-burger-menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link } from "react-router-dom";
import "./burguerMenu.css";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { darkColor, lightColor } from "../../utils/helpers";
import AccordionMenuContainer from "../accordionMenu/AccordionMenu";
export const BurguerMenu = (burguerMenuProps) => {
  const { closeMenu, menuOpen, handleStateChange, darkMode } = burguerMenuProps;
  const accordionProps = { closeMenu, darkColor, lightColor, darkMode };
  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={handleStateChange}
      customBurgerIcon={<MenuRoundedIcon sx={{ color: "white" }} />}
      styles={{
        bmMenuWrap: {
          backgroundColor: darkMode ? darkColor : lightColor,
        },
      }}
    >
      <div className="bm-menu-title">GESTIÓN NORAGO</div>
      <div className="bm-menu">
        <ul className="bm-item-list">
          <Link to={"/clients/clientsList"} onClick={closeMenu}>
            <li className="bm-item">
              {" "}
              <PersonIcon /> Clientes
            </li>
          </Link>

          <Link to={"/services/servicesList"} onClick={closeMenu}>
            <li className="bm-item">
              {" "}
              <BuildIcon /> Servicios
            </li>
          </Link>

          <Link to={"/prices/pricesList"} onClick={closeMenu}>
            <li className="bm-item">
              {" "}
              <AttachMoneyIcon /> Precios
            </li>
          </Link>
          <div style={{ marginTop: "80px" }}>
            <AccordionMenuContainer {...accordionProps} />
          </div>
        </ul>
      </div>
    </Menu>
  );
};
