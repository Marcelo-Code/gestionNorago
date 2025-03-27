import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ErrorBoundary from "./ErrorBoundary";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./monthlyIncomes.css";
import { darkColor, buttonColor } from "../../utils/helpers";

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
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                renderInput={(params) => <TextField {...params} />}
                views={["month", "year"]}
                sx={{
                  backgroundColor: "white",
                }}
              />
              <DatePicker
                label="Mes fin"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
                views={["month", "year"]}
                sx={{
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>
          <div className="monthlyIncomesChart">
            <BarChart
              width={500}
              height={300}
              data={data}
              style={{
                backgroundColor: "white",
                paddingTop: "30px",
                margin: "0 auto",
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "black" }} // Color de las letras en el eje X
              />
              <YAxis
                tick={{ fill: "black" }} // Color de las letras en el eje X
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="monthlyIncomesTable">
            <table
              style={{ backgroundColor: darkMode ? buttonColor : "white" }}
            >
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
                    <td>{monthlyData ? monthlyData[monthYear] : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </LocalizationProvider>
    </ErrorBoundary>
  );
};
