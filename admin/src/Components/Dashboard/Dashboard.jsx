import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const fetchInfo = async () => {
    setLoading(true);
    await fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => setAllProducts(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Dashboard stats
  const totalProducts = allproducts.length;
  const totalSold = allproducts.reduce((sum, p) => sum + (p.sold || 0), 0);
  const totalRevenue = allproducts.reduce(
    (sum, p) => sum + (p.sold || 0) * (p.new_price || 0),
    0
  );
  const bestSeller = allproducts.reduce(
    (max, p) => (p.sold > (max?.sold || 0) ? p : max),
    null
  );
  const categories = {};
  allproducts.forEach((p) => {
    if (!categories[p.category]) categories[p.category] = { count: 0, sold: 0 };
    categories[p.category].count++;
    categories[p.category].sold += p.sold || 0;
  });

  // Prepare data for chart
  const categoryLabels = Object.keys(categories);
  const soldData = Object.values(categories).map((val) => val.sold);

  useEffect(() => {
    if (chartRef.current && categoryLabels.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: categoryLabels,
          datasets: [
            {
              label: "Products Sold",
              data: soldData,
              backgroundColor: "rgba(236, 72, 153, 0.7)",
              borderColor: "rgba(236, 72, 153, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Sales by Category",
              color: "#fff",
              font: { size: 18 },
            },
          },
          scales: {
            x: { ticks: { color: "#fff" }, grid: { color: "#334155" } },
            y: {
              ticks: { color: "#fff" },
              grid: { color: "#334155" },
              beginAtZero: true,
            },
          },
        },
      });
    }
    // Cleanup
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [categoryLabels.join(","), soldData.join(",")]);

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center pt-24 overflow-auto">
      <div className="w-full max-w-5xl bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12 border border-blue-700 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white tracking-wide drop-shadow text-center">
          Dashboard Overview
        </h1>
        {loading ? (
          <div className="text-center text-blue-200 py-12 text-lg font-semibold">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-blue-900/80 rounded-xl p-6 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-pink-400">
                  {totalProducts}
                </span>
                <span className="text-blue-100 mt-2 font-semibold">
                  Total Products
                </span>
              </div>
              <div className="bg-blue-900/80 rounded-xl p-6 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-green-400">
                  {totalSold}
                </span>
                <span className="text-blue-100 mt-2 font-semibold">
                  Total Sold
                </span>
              </div>
              <div className="bg-blue-900/80 rounded-xl p-6 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-yellow-300">
                  ${totalRevenue.toLocaleString()}
                </span>
                <span className="text-blue-100 mt-2 font-semibold">
                  Total Revenue
                </span>
              </div>
              <div className="bg-blue-900/80 rounded-xl p-6 flex flex-col items-center shadow">
                <span className="text-2xl font-bold text-purple-300 text-center">
                  {bestSeller ? bestSeller.name : "-"}
                </span>
                <span className="text-blue-100 mt-2 font-semibold text-center">
                  Best Seller
                </span>
                <span className="text-xs text-blue-300 mt-1">
                  Sold: {bestSeller?.sold || 0}
                </span>
              </div>
            </div>
            {/* Chart.js Bar Chart */}
            <div className="bg-gray-900/80 rounded-xl p-6 shadow mb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                Sales by Category (Chart)
              </h2>
              <div className="w-full flex justify-center">
                <canvas
                  ref={chartRef}
                  className="w-full max-w-xl h-64 bg-gray-800 rounded-xl"
                ></canvas>
              </div>
            </div>
            <div className="bg-gray-900/80 rounded-xl p-6 shadow">
              <h2 className="text-xl font-bold text-white mb-4">
                Recent Products
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-blue-100 text-sm">
                  <thead>
                    <tr className="bg-blue-950/80">
                      <th className="px-3 py-2 text-left">Product</th>
                      <th className="px-3 py-2 text-left">Category</th>
                      <th className="px-3 py-2 text-left">Price</th>
                      <th className="px-3 py-2 text-left">Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...allproducts]
                      .slice(-5)
                      .reverse()
                      .map((p) => (
                        <tr key={p.id} className="border-b border-blue-900/40">
                          <td className="px-3 py-2 flex items-center gap-2">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-8 w-8 object-contain rounded bg-gray-800 border border-blue-900"
                            />
                            <span>{p.name}</span>
                          </td>
                          <td className="px-3 py-2">{p.category}</td>
                          <td className="px-3 py-2">${p.new_price}</td>
                          <td className="px-3 py-2">{p.sold ?? 0}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
