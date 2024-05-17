import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./ChartStyles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
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
      const data = response.data.PriceRange;

      if (data && typeof data === "object") {
        const customLabels = Object.keys(data);
        const values = Object.values(data);

        const formattedData = {
          labels: customLabels,
          datasets: [
            {
              label: "Price Range",
              data: values,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
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
      <h2>Price Range</h2>
      {chartData.labels ? <Bar data={chartData} /> : <p>Loading data...</p>}
    </div>
  );
};

export default BarChart;
