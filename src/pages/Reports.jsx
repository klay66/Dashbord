import React, { useState } from "react";
import { BarChart2, Users, ShoppingCart, FolderKanban } from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// تسجيل مكونات Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

export default function Reports() {
    const [chartType, setChartType] = useState("bar"); // 'bar', 'line', 'doughnut'

    // بيانات استاتك مؤقتة
    const stats = [
        {
            label: "Total Users",
            value: 24,
            icon: <Users size={32} className="text-brand-600" />,
        },
        {
            label: "Total Products",
            value: 18,
            icon: <ShoppingCart size={32} className="text-green-600" />,
        },
        {
            label: "Total Projects",
            value: 7,
            icon: <FolderKanban size={32} className="text-purple-600" />,
        },
        {
            label: "Total Sales",
            value: "12,500 EGP",
            icon: <BarChart2 size={32} className="text-orange-500" />,
        },
    ];

    // بيانات الرسم البياني
    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Sales in EGP",
                data: [1200, 1900, 3000, 2500, 2200, 3500],
                backgroundColor: "rgba(14, 165, 233, 0.35)",
                borderColor: "rgb(14, 165, 233)",
                borderWidth: 2,
            },
            {
                label: "Expenses in EGP",
                data: [800, 1200, 1500, 1000, 1300, 1800],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 2,
            },
        ],
    };

    const doughnutData = {
        labels: ["Electronics", "Clothing", "Food", "Books"],
        datasets: [
            {
                label: "Sales by Category",
                data: [35, 25, 20, 20],
                backgroundColor: [
                    "rgba(14, 165, 233, 0.7)",
                    "rgba(34, 197, 94, 0.7)",
                    "rgba(99, 102, 241, 0.7)",
                    "rgba(249, 115, 22, 0.7)",
                ],
                borderColor: [
                    "rgb(14, 165, 233)",
                    "rgb(34, 197, 94)",
                    "rgb(99, 102, 241)",
                    "rgb(249, 115, 22)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales and Expenses Overview",
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Sales by Category",
            },
        },
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">
            <h2 className="text-2xl font-bold text-brand-700 mb-8 text-center">Dashboard Reports</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition"
                    >
                        <div className="mb-3">{stat.icon}</div>
                        <div className="text-3xl font-extrabold text-brand-700 mb-2">{stat.value}</div>
                        <div className="text-gray-500 font-semibold">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-brand-600">Sales Overview</h3>
                    <div className="flex space-x-2">
                        <button
                            className={`px-3 py-1 rounded-md ${chartType === 'bar' ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setChartType('bar')}
                        >
                            Bar
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md ${chartType === 'line' ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setChartType('line')}
                        >
                            Line
                        </button>
                        <button
                            className={`px-3 py-1 rounded-md ${chartType === 'doughnut' ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setChartType('doughnut')}
                        >
                            Doughnut
                        </button>
                    </div>
                </div>

                <div className="w-full h-80 flex items-center justify-center">
                    {chartType === "bar" && <Bar data={chartData} options={options} />}
                    {chartType === "line" && <Line data={chartData} options={options} />}
                    {chartType === "doughnut" && <Doughnut data={doughnutData} options={doughnutOptions} />}
                </div>
            </div>
        </div>
    );
}