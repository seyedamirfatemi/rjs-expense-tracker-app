import React from 'react';

const StatsCards = ({ monthlyTotal, averageExpense, budgetStatus, expenseCount }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon total">
          <i className="fas fa-wallet"></i>
        </div>
        <div className="stat-info">
          <h3>${monthlyTotal.toFixed(2)}</h3>
          <p>Monthly Total</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon monthly">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="stat-info">
          <h3>{expenseCount}</h3>
          <p>Transactions</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon average">
          <i className="fas fa-calculator"></i>
        </div>
        <div className="stat-info">
          <h3>${averageExpense.toFixed(2)}</h3>
          <p>Average per Transaction</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon budget">
          <i className="fas fa-chart-pie"></i>
        </div>
        <div className="stat-info">
          <h3 style={{ color: budgetStatus.isOver ? '#ef4444' : '#10b981' }}>
            ${budgetStatus.total.toFixed(2)} / ${budgetStatus.budget}
          </h3>
          <p>Budget Used ({budgetStatus.percent.toFixed(0)}%)</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;