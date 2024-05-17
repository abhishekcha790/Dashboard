import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./ChartStyles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (month) {
      fetchData();
    }
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/data/combine`,
        { params: { selectedMonth: month } }
      );
      const data = response.data.Categories;

      if (data && typeof data === "object") {
        const labels = Object.keys(data);
        const values = Object.values(data);

        const formattedData = {
          labels: labels,
          datasets: [
            {
              label: "Category Data",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(formattedData);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="chart-container">
      <h2>Categories Chart</h2>
      {chartData.labels ? <Pie data={chartData} /> : <p>Loading data...</p>}
    </div>
  );
};

export default PieChart;
