import React, { useEffect, useState } from "react";
import "./ClientsList.css";
import { SwitchEditionMode } from "../../../layout/switchEditionMode/SwitchEditionMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BuildIcon from "@mui/icons-material/Build";
import { Box, Button, Chip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { SearchFilterComponent } from "../../../layout/filter/SearchFilterComponent";
import {
  FilterList as FilterIcon,
  ChevronLeft as ChevronLeftIcon,
  Close as CloseIcon,
  Sort as SortIcon,
} from "@mui/icons-material";

const ClientsList = (clientsListProps) => {
  const {
    clients,
    handleEditModeChange,
    editMode,
    handleDeleteClient,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    handleGoBack,
    toggleSearchBar,
    searchBarRef,
    editionBarRef,
  } = clientsListProps;

  const DEFAULT_STATUS_OPTIONS = [
    // { value: "all", label: "Todos" },
    // { value: "active", label: "Activos" },
    // { value: "inactive", label: "Inactivos" },
    // { value: "pending", label: "Pendientes" },
  ];

  const DEFAULT_TYPE_OPTIONS = [
    // { value: "all", label: "Todos" },
    // { value: "individual", label: "Individual" },
    // { value: "company", label: "Empresa" },
    // { value: "government", label: "Gobierno" },
  ];

  const DEFAULT_SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar" },
    { value: "alphabetical-asc", label: "Alfabético (A-Z)" },
    { value: "alphabetical-desc", label: "Alfabético (Z-A)" },
    // { value: "numeric-asc", label: "Ingresos (Menor a Mayor)" },
    //{ value: "numeric-desc", label: "Ingresos (Mayor a Menor)" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    active: false,
  });

  const [sortOption, setSortOption] = useState("none");
  const [filteredClients, setFilteredClients] = useState(clients);
  const [activeFilters, setActiveFilters] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Actualiza los filtros activos
  const updateActiveFilters = (currentFilters, currentSort) => {
    const newActiveFilters = [];

    if (currentFilters.status !== "all") {
      const statusLabel =
        DEFAULT_STATUS_OPTIONS.find(
          (opt) => opt.value === currentFilters.status
        )?.label || currentFilters.status;
      newActiveFilters.push({ key: "status", label: `Estado: ${statusLabel}` });
    }

    if (currentFilters.type !== "all") {
      const typeLabel =
        DEFAULT_TYPE_OPTIONS.find((opt) => opt.value === currentFilters.type)
          ?.label || currentFilters.type;
      newActiveFilters.push({ key: "type", label: `Tipo: ${typeLabel}` });
    }

    if (currentFilters.active) {
      newActiveFilters.push({ key: "active", label: "Solo activos" });
    }

    if (currentSort !== "none") {
      const sortLabel =
        DEFAULT_SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label ||
        currentSort;
      newActiveFilters.push({ key: "sort", label: `Ordenado: ${sortLabel}` });
    }

    setActiveFilters(newActiveFilters);
  };

  // Filtra los clientes basados en búsqueda, filtros y ordenamiento
  const applyFilters = (query, currentFilters, currentSort) => {
    const normalizeText = (text) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    let result = clients.filter((client) =>
      normalizeText(`${client.name} ${client.last_name}`).includes(
        normalizeText(query)
      )
    );

    if (currentFilters.status !== "all") {
      result = result.filter(
        (client) => client.status === currentFilters.status
      );
    }

    if (currentFilters.type !== "all") {
      result = result.filter((client) => client.type === currentFilters.type);
    }

    if (currentSort !== "none") {
      result.sort((a, b) => {
        if (currentSort.includes("alphabetical")) {
          return currentSort === "alphabetical-asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (currentSort.includes("numeric")) {
          return currentSort === "numeric-asc"
            ? a.income - b.income
            : b.income - a.income;
        }
        return 0;
      });
    }

    setFilteredClients(result);
  };

  // Maneja cambios en la barra de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Maneja cambios en los filtros
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateActiveFilters(newFilters, sortOption);
  };

  // Maneja cambios en el ordenamiento
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    updateActiveFilters(filters, event.target.value);
  };

  // Remueve un filtro específico
  const removeFilter = (key) => {
    const defaultValues = {
      status: "all",
      type: "all",
      active: true,
    };

    const newFilters = { ...filters, [key]: defaultValues[key] };
    setFilters(newFilters);
    updateActiveFilters(newFilters, sortOption);
  };

  // Reinicia el ordenamiento
  const resetSort = () => {
    setSortOption("none");
    updateActiveFilters(filters, "none");
  };

  // Efecto para actualizar los clientes filtrados
  useEffect(() => {
    applyFilters(searchQuery, filters, sortOption);
  }, [searchQuery, filters, sortOption, clients]);

  return (
    <div
      style={{ color: darkMode ? "white" : "black" }}
      className="clientsListContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="clientsListTitle"
      >
        Clientes
      </h2>
      {/* Contenedor principal */}
      {/* <ClientsBar
        darkMode={darkMode}
        darkColor={darkColor}
        handleEditModeChange={handleEditModeChange}
        buttonColor={buttonColor}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
      /> */}
      <div
        style={{
          backgroundColor: darkMode ? darkColor : "white",
          position: "sticky",
          top: 0,
        }}
        className="clientsListBar"
      >
        <div
          ref={editionBarRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            transition: "transform 300ms ease-in-out",
            backgroundColor: darkMode ? darkColor : "white",
            transform: "translateX(0)", // Inicialmente visible
          }}
        >
          <span style={{ fontSize: "0.9em", verticalAlign: "middle" }}>
            EDICIÓN
            <SwitchEditionMode
              onChange={handleEditModeChange}
              checked={editMode}
            />
          </span>
          <Link to="/clients/clientCreation">
            <Button variant={"contained"} startIcon={<PersonAddIcon />}>
              Cliente
            </Button>
          </Link>

          <IconButton
            onClick={() => toggleSearchBar()}
            size="small"
            sx={{ color: darkMode ? "white" : buttonColor }}
          >
            <SearchIcon />
          </IconButton>
        </div>

        <div
          ref={searchBarRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            transition: "transform 300ms ease-in-out",
            backgroundColor: darkMode ? darkColor : "white",
            transform: "translateX(100%)", // Inicialmente oculta
          }}
        >
          <SearchFilterComponent
            handleSearch={setSearchQuery}
            darkMode={darkMode}
            darkColor={darkColor}
            buttonColor={buttonColor}
            lightColor={lightColor}
            toggleSearchBar={toggleSearchBar}
            // activeFilters={activeFilters}
            // setActiveFilters={setActiveFilters}
            handleSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            toggleDrawer={setDrawerOpen}
            drawerOpen={drawerOpen}
            filters={filters}
            safeStatusOptions={DEFAULT_STATUS_OPTIONS} // Agregar esto
            safeTypeOptions={DEFAULT_TYPE_OPTIONS}
            safeSortOptions={DEFAULT_SORT_OPTIONS}
            handleFilterChange={handleFilterChange}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />{" "}
        </div>
      </div>
      <div style={{ width: "100%", height: "auto" }} className="otroContenedor">
        {activeFilters.length > 0 && (
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {activeFilters.map((filter) => (
              <Chip
                key={filter.key}
                label={filter.label}
                onDelete={() =>
                  filter.key !== "sort" ? removeFilter(filter.key) : resetSort()
                }
                deleteIcon={<CloseIcon />}
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "white", marginBot: "20px" }}
              />
            ))}
          </Box>
        )}
      </div>
      <div className="clientsList">
        {filteredClients.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}
        {filteredClients.map((client) => (
          <div
            key={client.id}
            style={{ backgroundColor: darkMode ? darkColor : "white" }}
            className="clientsItem"
          >
            <div className="clientsName">
              <PersonIcon />
              {client.name} {client.last_name}
            </div>
            <div className="clientsPhone">
              <WhatsAppIcon sx={{ color: green[500] }} />
              <a
                href={`https://wa.me/${client.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {client.phone}
              </a>
            </div>
            <div className="clientsAddress">
              <LocationOnIcon sx={{ color: "red" }} />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  client.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {client.address}
              </a>
            </div>
            <div className="clientsEmail">
              <AlternateEmailIcon />
              <a
                href={`mailto:${client.email}`}
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {client.email}
              </a>
            </div>
            {!editMode ? (
              <div className="clientsServiceButton">
                <Link
                  to={`/services/servicesList/${client.id}`}
                  style={{ width: "100%" }}
                >
                  <Button
                    startIcon={<BuildIcon />}
                    variant="outlined"
                    sx={{
                      color: darkMode ? "white" : buttonColor,
                      borderColor: darkMode ? "white" : buttonColor,
                    }}
                  >
                    Ver Servicios
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="clientsListActions">
                <Link onClick={() => handleDeleteClient(client.id)}>
                  <DeleteIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
                <Link to={`/clients/clientModification/${client.id}`}>
                  <EditIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="outlined"
        sx={{
          color: darkMode ? "white" : "#1976d2",
          backgroundColor: darkMode ? darkColor : "white",
          maxWidth: "600px",
          width: "80%",
          margin: "20px",
        }}
        onClick={handleGoBack}
      >
        Volver
      </Button>
    </div>
  );
};

export default ClientsList;
