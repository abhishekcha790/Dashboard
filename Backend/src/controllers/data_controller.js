import axios from "axios";

const AllData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    const filteredData = data.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.price === parseFloat(search)
      );
    });
    const totalData = filteredData.length;
    const paginatedData = filteredData.slice(skip, skip + limit);
    return res
      .status(200)
      .json({ totalCount: totalData, page: page, data: paginatedData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching  information." });
  }
};
const SalesInMonth = async (req, res) => {
  try {
    const { selectedMonth } = req.body;
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    let totalSale = 0;
    let salesCount = 0;
    let unsoldCount = 0;

    data.map((item) => {
      const date = new Date(item.dateOfSale);
      const month = date.getMonth() + 1;

      if (month === selectedMonth) {
        if (item.sold) {
          totalSale += item.price;
          salesCount++;
        } else {
          unsoldCount++;
        }
      }
    });
    return res.status(200).json({
      Statistics: {
        totalSales: totalSale,
        soldCount: salesCount,
        unsoldCount: unsoldCount,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching  information." });
  }
};
const BarChartData = async (req, res) => {
  const { selectedMonth } = req.body;
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    const filteredData = data.filter((item) => {
      const date = new Date(item.dateOfSale);
      return selectedMonth === date.getMonth() + 1;
    });
    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    filteredData.forEach((item) => {
      const price = item.price;

      if (price >= 0 && price <= 100) {
        priceRanges["0-100"]++;
      } else if (price >= 101 && price <= 200) {
        priceRanges["101-200"]++;
      } else if (price >= 201 && price <= 300) {
        priceRanges["201-300"]++;
      } else if (price >= 301 && price <= 400) {
        priceRanges["301-400"]++;
      } else if (price >= 401 && price <= 500) {
        priceRanges["401-500"]++;
      } else if (price >= 501 && price <= 600) {
        priceRanges["501-600"]++;
      } else if (price >= 601 && price <= 700) {
        priceRanges["601-700"]++;
      } else if (price >= 701 && price <= 800) {
        priceRanges["701-800"]++;
      } else if (price >= 801 && price <= 900) {
        priceRanges["801-900"]++;
      } else {
        priceRanges["901-above"]++;
      }
    });

    return res.status(200).json({ PriceRange: priceRanges });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching  information." });
  }
};
const PieData = async (req, res) => {
  try {
    const { selectedMonth } = req.body;
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    const filteredData = data.filter((item) => {
      const date = new Date(item.dateOfSale);
      return selectedMonth === date.getMonth() + 1;
    });
    const categoryCounts = {};
    filteredData.forEach((item) => {
      const category = item.category;
      if (!categoryCounts[category]) {
        categoryCounts[category] = 1;
      } else {
        categoryCounts[category]++;
      }
    });
    res.status(200).json({ Categories: categoryCounts });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching  information." });
  }
};
const Combine = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.selectedMonth) || 1;
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    const filteredData = data.filter((item) => {
      const date = new Date(item.dateOfSale);
      return selectedMonth === date.getMonth() + 1;
    });
    let totalSale = 0;
    let salesCount = 0;
    let unsoldCount = 0;
    filteredData.map((item) => {
      if (item.sold == true) {
        totalSale += item.price;
        salesCount++;
      } else {
        unsoldCount++;
      }
    });
    const statistics = {
      totalSales: totalSale,
      soldCount: salesCount,
      unsoldCount: unsoldCount,
    };
    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    filteredData.forEach((item) => {
      const price = item.price;

      if (price >= 0 && price <= 100) {
        priceRanges["0-100"]++;
      } else if (price >= 101 && price <= 200) {
        priceRanges["101-200"]++;
      } else if (price >= 201 && price <= 300) {
        priceRanges["201-300"]++;
      } else if (price >= 301 && price <= 400) {
        priceRanges["301-400"]++;
      } else if (price >= 401 && price <= 500) {
        priceRanges["401-500"]++;
      } else if (price >= 501 && price <= 600) {
        priceRanges["501-600"]++;
      } else if (price >= 601 && price <= 700) {
        priceRanges["601-700"]++;
      } else if (price >= 701 && price <= 800) {
        priceRanges["701-800"]++;
      } else if (price >= 801 && price <= 900) {
        priceRanges["801-900"]++;
      } else {
        priceRanges["901-above"]++;
      }
    });
    const categoryCounts = {};
    filteredData.forEach((item) => {
      const category = item.category;
      if (!categoryCounts[category]) {
        categoryCounts[category] = 1;
      } else {
        categoryCounts[category]++;
      }
    });
    return res.status(200).json({
      Statistics: statistics,
      PriceRange: priceRanges,
      Categories: categoryCounts,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching  information." });
  }
};

export { AllData, SalesInMonth, BarChartData, PieData, Combine };
