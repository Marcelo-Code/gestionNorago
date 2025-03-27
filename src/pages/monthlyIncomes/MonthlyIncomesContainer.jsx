import React, { useState, useEffect, useContext } from "react";
import { getServices } from "../../services/api/services";
import { LoadingContainer } from "../../layout/loading/LoadingContainer";
import { MonthlyIncomes } from "./MonthyIncomes";
import { monthFormat } from "../../utils/helpers";
import { GeneralContext } from "../../context/GeneralContext";
import dayjs from "dayjs";

export const MonthlyIncomesContainer = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { darkMode } = useContext(GeneralContext);

  // Establecer las fechas por defecto (últimos 12 meses)
  const [startDate, setStartDate] = useState(
    dayjs().subtract(12, "month").startOf("month")
  );
  const [endDate, setEndDate] = useState(dayjs().endOf("month"));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then(({ data: services }) => {
        // Inicializa monthlyTotals con los últimos 12 meses en 0
        const monthlyTotals = {};
        const now = new Date();

        // Genera las claves de los últimos 12 meses
        for (let i = 0; i < 12; i++) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          monthlyTotals[monthFormat(date)] = 0;
        }

        // Filtra y suma los valores dentro del rango de fechas
        services
          .filter(({ date }) => {
            const serviceDate = dayjs(date);
            return serviceDate.isBetween(startDate, endDate, null, "[]");
          })
          .forEach(({ date, total_price }) => {
            const monthYear = monthFormat(date);
            monthlyTotals[monthYear] += total_price;
          });

        setMonthlyData(monthlyTotals);
      })
      .catch((error) => console.error("Error fetching services:", error))
      .finally(() => setIsLoading(false));
  }, [startDate, endDate]); // Dependencias de startDate y endDate

  if (isLoading) {
    return <LoadingContainer />;
  }

  const data = Object.entries(monthlyData).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  const monthYearList = Object.keys(monthlyData).sort(
    (a, b) => new Date(a) - new Date(b)
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
  };

  return <MonthlyIncomes {...monthlyIncomesContainerProps} />;
};
