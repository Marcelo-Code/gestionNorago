import React, { useState, useEffect } from "react";
import { getServices } from "../services/api/services";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MonthlyServicesTable = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await getServices();
        const services = response.data;

        const monthlyTotals = {};
        services.forEach((service) => {
          const date = new Date(service.date);
          const monthYear = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;
          if (!monthlyTotals[monthYear]) {
            monthlyTotals[monthYear] = 0;
          }
          monthlyTotals[monthYear] += service.total_price;
        });

        // Get last 12 months
        const today = new Date();
        const last12Months = {};
        for (let i = 11; i >= 0; i--) {
          const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const monthYear = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;
          last12Months[monthYear] = monthlyTotals[monthYear] || 0;
        }

        setMonthlyData(last12Months);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const data = Object.entries(monthlyData).map(([month, revenue]) => ({
    month,
    revenue,
  }));
  const monthYearList = Object.keys(monthlyData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div>
      <h2>Monthly Services Revenue</h2>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {monthYearList.map((monthYear) => (
            <tr key={monthYear}>
              <td>{monthYear}</td>
              <td>{monthlyData[monthYear]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyServicesTable;
