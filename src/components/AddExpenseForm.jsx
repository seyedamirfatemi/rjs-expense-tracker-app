import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const AddExpenseForm = ({ onSubmit, categories, editingExpense, onUpdate, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date
      });
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    if (editingExpense) {
      onUpdate(editingExpense.id, expenseData);
    } else {
      onSubmit(expenseData);
    }
    
    setFormData({
      title: '',
      amount: '',
      category: 'food',
      date: format(new Date(), 'yyyy-MM-dd')
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-container">
      <div className="section-title">
        <i className="fas fa-plus-circle" style={{ color: '#667eea' }}></i>
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </div>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery shopping"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" className="cancel-btn" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;