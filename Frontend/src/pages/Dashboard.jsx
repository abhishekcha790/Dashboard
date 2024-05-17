import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Dashboard = () => {
  const [statics, setStatics] = useState(null);
  const [month, setMonth] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/data/combine`,
          { params: { selectedMonth: month } }
        );
        setStatics(response.data.Statistics);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchProducts();
  }, [month]);

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
    console.log(month);
  };

  return (
    <div className="dashboard-container">
      <div className="header-container">
        <h1>Dashboard</h1>
        <div className="select-container">
          <select
            id="monthSelect"
            className="month-select"
            value={month}
            onChange={handleMonthChange}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <div className="cards-row">
        <div className="card">
          <h2>Total sale</h2>
          {statics ? <p>${statics.totalSales}</p> : <p>Loading...</p>}
        </div>
        <div className="card">
          <h2>Total sold items</h2>
          {statics ? <p>{statics.soldCount}</p> : <p>Loading...</p>}
        </div>
        <div className="card">
          <h2>Total not sold items</h2>
          {statics ? <p>{statics.unsoldCount}</p> : <p>Loading...</p>}
        </div>
      </div>
      <div className="cards-row">
        <div className="card half-width">
          <h2>Bar Chart</h2>
          <BarChart month={month} />
        </div>
        <div className="card half-width">
          <h2>Pie Chart</h2>
          <PieChart month={month} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
