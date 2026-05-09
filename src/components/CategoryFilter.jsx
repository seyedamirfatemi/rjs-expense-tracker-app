import React from 'react';
import { format } from 'date-fns';

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  selectedMonth,
  onSelectMonth,
  searchTerm,
  onSearchChange,
  onClearFilters
}) => {
  const getMonthsList = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy')
      });
    }
    return months;
  };

  return (
    <div className="filters-bar">
      <div className="filter-group">
        <select 
          className="filter-select" 
          value={selectedMonth} 
          onChange={(e) => onSelectMonth(e.target.value)}
        >
          {getMonthsList().map(month => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        
        <input
          type="text"
          className="filter-select"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ minWidth: 180 }}
        />
      </div>
      
      <div className="category-buttons">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
      
      <button className="clear-filters" onClick={onClearFilters}>
        <i className="fas fa-times"></i> Clear
      </button>
    </div>
  );
};

export default CategoryFilter;