import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import the Bar chart component
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.description),  // Use description for labels
    datasets: [
      {
        label: 'Expense Amount',
        data: data.map(item => item.amount),   // Use amount as the data
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Light Red for Bars
        borderColor: 'rgba(255, 99, 132, 1)',     // Darker Red Border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expense Overview',
        font: {
          size: 20, // Title font size
          family: 'Poppins, sans-serif', // Title font family
        },
        color: '#333', // Title color
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for tooltips
        titleColor: '#fff',      // Tooltip title color
        bodyColor: '#fff',       // Tooltip body color
        borderColor: 'rgba(255, 99, 132, 0.8)', // Border color for tooltips
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.3)', // Lighter grid lines
        },
        ticks: {
          color: '#333', // X-axis tick color
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.3)', // Lighter grid lines
        },
        ticks: {
          color: '#333', // Y-axis tick color
        },
      },
    },
    elements: {
      bar: {
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Bar color (red)
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)', // Hover effect (darker red)
      },
    },
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, )', padding: '20px', borderRadius: '8px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
