import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ categoryTotals, categories, monthlyTotal }) => {
  const chartData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => categoryTotals[cat.id] || 0),
        backgroundColor: categories.map(cat => cat.color),
        borderWidth: 0,
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 11 },
          usePointStyle: true,
          boxWidth: 10
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  const hasData = Object.values(categoryTotals).some(v => v > 0);

  return (
    <div className="chart-container">
      <div className="section-title">
        <i className="fas fa-chart-pie" style={{ color: '#f59e0b' }}></i>
        Expense Breakdown
      </div>
      
      {hasData ? (
        <>
          <Pie data={chartData} options={options} height={250} />
          <div style={{ textAlign: 'center', marginTop: 16, color: '#666', fontSize: 13 }}>
            Total: <strong style={{ color: '#667eea' }}>${monthlyTotal.toFixed(2)}</strong>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
          <i className="fas fa-chart-simple" style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}></i>
          <p>No data for selected period</p>
          <p style={{ fontSize: 12 }}>Add some expenses to see the chart</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;