import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import { Link } from "react-router-dom";
import "./accordionMenu.css";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function AccordionMenu({
  closeMenu,
  darkMode,
  darkColor,
  lightColor,
}) {
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: darkMode ? darkColor : lightColor,
          boxShadow: "none",
          width: "100%",
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon sx={{ color: "white" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            flexDirection: "row-reverse",
          }}
        >
          <Typography component="span">
            <span className="accordionTitle">Inactivos</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingLeft: "10px", // Reduce el padding izquierdo
            marginLeft: "-10px", // Mueve el contenido hacia la izquierda
          }}
        >
          <Typography>
            <Link to={"/clients/inactiveClientsList"} onClick={closeMenu}>
              {" "}
              <li className="accordionItem">
                <PersonIcon /> Clientes{" "}
              </li>{" "}
            </Link>{" "}
            <Link to={"/services/inactiveServicesList"} onClick={closeMenu}>
              {" "}
              <li className="accordionItem">
                <BuildIcon /> Servicios{" "}
              </li>{" "}
            </Link>
            <Link to={`/prices/pricesList/false`} onClick={closeMenu}>
              <li className="accordionItem">
                {" "}
                <AttachMoneyIcon /> Precios
              </li>
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
