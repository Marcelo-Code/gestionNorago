import React, { useState, useEffect, useContext } from "react";
import { getServices } from "../../services/api/services";
import { LoadingContainer } from "../../layout/loading/LoadingContainer";
import { MonthlyIncomes } from "./MonthyIncomes";
import { monthFormat } from "../../utils/helpers";
import { GeneralContext } from "../../context/GeneralContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export const MonthlyIncomesContainer = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { darkMode } = useContext(GeneralContext);

  // Se establecen las fechas por defecto, los últimos 12 meses
  const now = dayjs();
  // Primer día de hace 12 meses
  const start = now.subtract(12, "month").startOf("month");
  // Primer día del mes actual
  const end = now.startOf("month");
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then((response) => {
        const dias = response.data;

        // Genera una lista de todos los meses dentro del rango de fechas
        const allMonths = [];
        let currentMonth = startDate.clone().startOf("month");
        const endMonth = endDate.clone().endOf("month");

        // Agregar todos los meses en el rango al array allMonths
        while (
          currentMonth.isBefore(endMonth) ||
          currentMonth.isSame(endMonth, "month")
        ) {
          // Usar monthFormat para formatear mes/año
          allMonths.push(monthFormat(currentMonth));
          currentMonth = currentMonth.add(1, "month");
        }

        const filteredDays = dias.filter((dia) => {
          const diaDate = dayjs(dia.date);
          return diaDate.isBetween(startDate, endDate, null, "[]"); // Filtrar con dayjs
        });

        // Genera las claves y el total_price para los meses filtrados
        const monthlyTotals = {};

        // Inicializar todos los meses con 0
        allMonths.forEach((month) => {
          monthlyTotals[month] = 0;
        });

        // Filtra y suma los valores dentro del rango de fechas de los días filtrados
        filteredDays.forEach(({ date, total_price }) => {
          const monthYear = monthFormat(date);

          // Suma el total_price al mes correspondiente
          if (monthlyTotals[monthYear] !== undefined) {
            monthlyTotals[monthYear] += total_price;
          }
        });

        console.log(monthlyTotals);

        setMonthlyData(monthlyTotals);
      })
      .catch((error) => console.error("Error fetching services:", error))
      .finally(() => setIsLoading(false));
  }, [startDate, endDate]);

  if (isLoading) {
    return <LoadingContainer />;
  }

  const data = Object.entries(monthlyData).map(([mes, ingresos]) => ({
    mes,
    ingresos,
  }));

  // Ordenar correctamente los meses
  const monthYearList = Object.keys(monthlyData).sort((a, b) =>
    dayjs(a, "MM/YYYY").isBefore(dayjs(b, "MM/YYYY")) ? 1 : -1
  );

  const monthlyIncomesContainerProps = {
    data,
    monthYearList,
    monthlyData,
    darkMode,
    handleStartDateChange,
    handleEndDateChange,
    startDate,
    endDate,
    handleGoBack,
  };

  return <MonthlyIncomes {...monthlyIncomesContainerProps} />;
};
