# FinanceFlow 💰 - Personal Expense Tracker

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://your-demo-link.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/seyedamirfatemi/expense-tracker)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Made with](https://img.shields.io/badge/Made_with-React-61dafb?style=for-the-badge&logo=react)]()

> **Take Control of Your Finances** — Track, analyze, and optimize your spending with a beautiful dashboard


## 📸 Screenshots

| Dashboard Overview | Add Expense Form |
|-------------------|------------------|
| ![Dashboard](./screenshots/light-mode.png) | ![Add Expense](./screenshots/dark-mode.png) |

---

## 📖 Table of Contents

- [English Version](#english-version)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage Guide](#usage-guide)
  - [Expense Categories](#expense-categories)
  - [Folder Structure](#folder-structure)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Future Improvements](#future-improvements)
  - [Browser Support](#browser-support)
- [نسخه فارسی](#نسخه-فارسی)
  - [ویژگی‌ها](#ویژگی‌ها)
  - [تکنولوژی‌های استفاده شده](#تکنولوژی‌های-استفاده-شده)
  - [نصب و اجرا](#نصب-و-اجرا)
  - [راهنمای استفاده](#راهنمای-استفاده)
  - [دسته‌بندی‌های هزینه](#دسته‌بندی‌های-هزینه)
  - [ساختار پوشه‌ها](#ساختار-پوشه‌ها)
  - [میانبرهای صفحه کلید](#میانبرهای-صفحه-کلید)
  - [بهبودهای آتی](#بهبودهای-آتی)
  - [مرورگرهای پشتیبانی شده](#مرورگرهای-پشتیبانی-شده)
- [Credits](#credits)

---

# English Version

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 💵 **Add Expenses** | Quick form to add expenses with title, amount, category, and date |
| ✏️ **Edit Expenses** | Modify existing expenses with pre-filled form |
| 🗑️ **Delete Expenses** | Remove unwanted entries with confirmation |
| 📊 **Pie Chart** | Visual breakdown of spending by category |
| 📈 **Statistics Cards** | Monthly total, transaction count, average expense, budget usage |
| 🔍 **Search** | Filter expenses by title or description |
| 🗓️ **Month Filter** | View expenses from any of the last 12 months |
| 🏷️ **Category Filter** | Filter by 8 different expense categories |
| 🎯 **Budget Tracking** | $2000 monthly budget with visual progress bar |
| ⚠️ **Budget Alerts** | Color-coded warning when exceeding budget |
| 🌓 **Dark/Light Mode** | Theme preference saved in localStorage |
| 💾 **Local Storage** | All data persists between sessions |
| 📱 **Fully Responsive** | Works perfectly on mobile, tablet, and desktop |
| 🎨 **Modern UI** | Glassmorphism design with smooth animations |

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **Vite** | Build tool and dev server |
| **Chart.js + react-chartjs-2** | Pie chart visualization |
| **date-fns** | Date manipulation and formatting |
| **CSS3** | Styling, animations, responsive design |
| **FontAwesome 6** | Icons |
| **Google Fonts (Inter)** | Typography |
| **LocalStorage** | Data persistence |

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step-by-Step Installation

```bash
# Clone the repository
git clone https://github.com/seyedamirfatemi/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
