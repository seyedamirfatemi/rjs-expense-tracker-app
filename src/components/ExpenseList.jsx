import React from 'react';
import { format } from 'date-fns';

const ExpenseList = ({ expenses, categories, onEdit, onDelete }) => {
  const getCategoryIcon = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.icon : '📦';
  };

  const getCategoryColor = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.color : '#6b7280';
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <div className="section-title">
          <i className="fas fa-list"></i>
          Expense History
        </div>
        <div className="empty-state">
          <i className="fas fa-receipt"></i>
          <p>No expenses found</p>
          <p style={{ fontSize: 12 }}>Try changing filters or add a new expense</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <div className="section-title">
        <i className="fas fa-list"></i>
        Expense History ({expenses.length} items)
      </div>
      
      <div className="expense-items">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <div 
                className="expense-category-icon"
                style={{ background: `${getCategoryColor(expense.category)}20` }}
              >
                {getCategoryIcon(expense.category)}
              </div>
              <div className="expense-details">
                <div className="expense-title">{expense.title}</div>
                <div className="expense-date">
                  {format(new Date(expense.date), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
            <div className="expense-amount">
              ${expense.amount.toFixed(2)}
            </div>
            <div className="expense-actions">
              <button className="edit-btn" onClick={() => onEdit(expense)}>
                <i className="fas fa-pen"></i>
              </button>
              <button className="delete-btn" onClick={() => onDelete(expense.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;