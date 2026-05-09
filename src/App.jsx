import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseChart from './components/ExpenseChart';
import ExpenseList from './components/ExpenseList';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';

const CATEGORIES = [
  { id: 'food', name: 'Food', icon: '🍔', color: '#f59e0b' },
  { id: 'transport', name: 'Transport', icon: '🚗', color: '#3b82f6' },
  { id: 'bills', name: 'Bills', icon: '💡', color: '#ef4444' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#ec4899' },
  { id: 'health', name: 'Health', icon: '💊', color: '#10b981' },
  { id: 'education', name: 'Education', icon: '📚', color: '#06b6d4' },
  { id: 'other', name: 'Other', icon: '📦', color: '#6b7280' }
];

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: expense.date || format(new Date(), 'yyyy-MM-dd')
    };
    setExpenses([newExpense, ...expenses]);
    showNotification('Expense added successfully!');
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...updatedExpense, id } : exp
    ));
    setEditingExpense(null);
    showNotification('Expense updated successfully!');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    showNotification('Expense deleted successfully!');
  };

  const getFilteredExpenses = () => {
    let filtered = [...expenses];
    
    const [year, month] = selectedMonth.split('-');
    const monthStart = startOfMonth(new Date(year, month - 1));
    const monthEnd = endOfMonth(new Date(year, month - 1));
    
    filtered = filtered.filter(expense => 
      isWithinInterval(new Date(expense.date), { start: monthStart, end: monthEnd })
    );
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getMonthlyTotal = () => {
    const filtered = getFilteredExpenses();
    return filtered.reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getCategoryTotals = () => {
    const filtered = getFilteredExpenses();
    const totals = {};
    CATEGORIES.forEach(cat => { totals[cat.id] = 0; });
    filtered.forEach(exp => {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    });
    return totals;
  };

  const getAverageExpense = () => {
    const filtered = getFilteredExpenses();
    if (filtered.length === 0) return 0;
    return getMonthlyTotal() / filtered.length;
  };

  const getBudgetStatus = () => {
    const total = getMonthlyTotal();
    const budget = 2000;
    const percent = (total / budget) * 100;
    return { total, budget, percent, isOver: total > budget };
  };

  const filteredExpenses = getFilteredExpenses();
  const monthlyTotal = getMonthlyTotal();
  const averageExpense = getAverageExpense();
  const budgetStatus = getBudgetStatus();
  const categoryTotals = getCategoryTotals();

  return (
    <div className="app">
      <div className="container">
        <Header />
        
        <StatsCards 
          monthlyTotal={monthlyTotal}
          averageExpense={averageExpense}
          budgetStatus={budgetStatus}
          expenseCount={filteredExpenses.length}
        />
        
        <div className="dashboard">
          <AddExpenseForm 
            onSubmit={addExpense}
            categories={CATEGORIES}
            editingExpense={editingExpense}
            onUpdate={updateExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />
          
          <ExpenseChart 
            categoryTotals={categoryTotals}
            categories={CATEGORIES}
            monthlyTotal={monthlyTotal}
          />
        </div>
        
        <CategoryFilter 
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearFilters={() => {
            setSelectedCategory('all');
            setSearchTerm('');
          }}
        />
        
        <ExpenseList 
          expenses={filteredExpenses}
          categories={CATEGORIES}
          onEdit={setEditingExpense}
          onDelete={deleteExpense}
        />
        
        <Footer />
      </div>
      
      <div className={`toast ${showToast ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
};

export default App;