import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./monthlyIncomes.css";
import { buttonColor, currencyFormat } from "../../utils/helpers";

import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const MonthlyIncomes = (monthlyIncomesContainerProps) => {
  const {
    data,
    monthYearList,
    monthlyData,
    darkMode,
    handleStartDateChange,
    handleEndDateChange,
    startDate,
    endDate,
  } = monthlyIncomesContainerProps;

  const textShadow = { textShadow: "1px 1px 1px gray" };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
      <div
        style={{ color: darkMode ? "white" : "black" }}
        className="monthlyIncomesContainer"
      >
        <div
          style={{ color: darkMode ? "white" : "black" }}
          className="monthlyIncomesTitle"
        >
          <h2 style={{ color: darkMode ? "white" : "#1976d2" }}>
            Ingresos Mensuales
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <div className="monthlyIncomesFilters">
            <DatePicker
              label="Mes inicio"
              value={startDate}
              onChange={handleStartDateChange}
              views={["month", "year"]}
              sx={{
                backgroundColor: "white",
              }}
              maxDate={endDate}
            />
            <DatePicker
              label="Mes fin"
              value={endDate}
              onChange={handleEndDateChange}
              views={["month", "year"]}
              sx={{
                backgroundColor: "white",
              }}
              minDate={startDate}
            />
          </div>
        </div>
        <div className="monthlyIncomesChart">
          <BarChart
            width={500}
            height={350}
            data={data}
            style={{
              backgroundColor: "white",
              paddingTop: "30px",
              margin: "0 auto",
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="mes"
              tick={{ fill: "black", angle: -45, textAnchor: "end" }} // Rotar etiquetas 45° hacia la izquierda
              height={60}
            />
            <YAxis
              tick={{ fill: "black" }} // Color de las letras en el eje X
              tickFormatter={(value) =>
                new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 0,
                }).format(value)
              }
            />
            <Tooltip formatter={(value) => currencyFormat(value)} />
            {/* <Legend /> */}
            <Bar dataKey="ingresos" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="monthlyIncomesTable">
          <table style={{ backgroundColor: darkMode ? buttonColor : "white" }}>
            <thead>
              <tr>
                <th style={textShadow}>Mes</th>
                <th style={textShadow}>Ingresos Totales</th>
              </tr>
            </thead>
            <tbody>
              {monthYearList.map((monthYear) => (
                <tr key={monthYear}>
                  <td>{monthYear}</td>
                  <td>{currencyFormat(monthlyData[monthYear])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LocalizationProvider>
  );
};
