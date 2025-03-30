import React, { useEffect, useState } from "react";
import { SearchFilter } from "./SearchFilter";
import { FilterChips } from "./FilterChips";

export const SearchFilterContainer = (searchFilterContainerProps) => {
  const {
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    toggleSearchBar,
    setFilteredClients,
    clients,
    activeFilters,
    setActiveFilters,
    DEFAULT_STATUS_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_SORT_OPTIONS,
    sortFields,
    showSearchFilter,
  } = searchFilterContainerProps;

  // console.log(clients);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    active: false,
  });

  const [sortOption, setSortOption] = useState("none");
  const [sortOptionName, setSortOptionName] = useState("none");
  // const [filteredClients, setFilteredClients] = useState(clients);
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
  const applyFilters = (
    searchQuery,
    filters,
    sortOption,
    sortOptionName,
    clients,
    sortFields
  ) => {
    const normalizeText = (text) =>
      String(text || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const getNestedValue = (obj, prop) => {
      return prop
        .split(".")
        .reduce((acc, part) => (acc ? acc[part] : undefined), obj);
    };

    let result = clients.filter((client) =>
      sortFields.some((prop) =>
        // normalizeText(client[prop]).includes(normalizeText(searchQuery))
        normalizeText(getNestedValue(client, prop)).includes(
          normalizeText(searchQuery)
        )
      )
    );
    console.log(sortFields);
    console.log(result);

    if (filters.status !== "all") {
      result = result.filter((client) => client.status === filters.status);
    }

    if (filters.type !== "all") {
      result = result.filter((client) => client.type === filters.type);
    }

    if (sortOption !== "none") {
      result.sort((a, b) => {
        // Ordenamiento alfabético
        if (sortOption.includes("alphabetical")) {
          const comparison =
            sortOption === "alphabetical-asc"
              ? normalizeText(a[sortOptionName]).localeCompare(
                  normalizeText(b[sortOptionName])
                )
              : normalizeText(b[sortOptionName]).localeCompare(
                  normalizeText(a[sortOptionName])
                );

          // Si la comparación no es 0, entonces se retorna el resultado de esa comparación
          if (comparison !== 0) {
            return comparison;
          }
        }
        // Ordenamiento numérico
        else if (sortOption.includes("numeric")) {
          const comparison =
            sortOption === "numeric-asc"
              ? a[sortOptionName] - b[sortOptionName]
              : b[sortOptionName] - a[sortOptionName];

          // Si la comparación no es 0, entonces se retorna el resultado de esa comparación
          if (comparison !== 0) {
            return comparison;
          }
        }
        // Ordenamiento por fecha
        else if (sortOption.includes("date")) {
          const dateA = new Date(a[sortOptionName]);
          const dateB = new Date(b[sortOptionName]);

          // Verifica que ambas fechas sean válidas
          if (isNaN(dateA) || isNaN(dateB)) {
            console.warn(
              `Invalid date values for ${sortOptionName}: ${a[sortOptionName]}, ${b[sortOptionName]}`
            );
            return 0;
          }

          const comparison =
            sortOption === "date-asc" ? dateA - dateB : dateB - dateA;

          // Si la comparación no es 0, entonces se retorna el resultado de esa comparación
          if (comparison !== 0) {
            return comparison;
          }
        }

        // Si todas las comparaciones son 0 (todas las propiedades son iguales), se retorna 0
        return 0;
      });
    }

    // console.log(result);

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
    setSortOptionName(event.target.name);
    console.log(event.target.name);
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
    applyFilters(
      searchQuery,
      filters,
      sortOption,
      sortOptionName,
      clients,
      sortFields
    );
  }, [searchQuery, filters, sortOption, sortOptionName, clients]);

  const searchFilterProps = {
    darkMode,
    darkColor,
    buttonColor,
    lightColor,
    toggleSearchBar,
    handleSearchChange,
    searchQuery,
    setDrawerOpen,
    drawerOpen,
    filters,
    DEFAULT_STATUS_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_SORT_OPTIONS,
    handleFilterChange,
    sortOption,
    handleSortChange,
  };

  const filterChipsProps = {
    activeFilters,
    removeFilter,
    resetSort,
  };

  return (
    <>
      {showSearchFilter ? (
        <SearchFilter {...searchFilterProps} />
      ) : (
        <FilterChips {...filterChipsProps} />
      )}
    </>
  );
};
