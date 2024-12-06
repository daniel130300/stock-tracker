# Stock Tracker App

A modern, fast, and user-friendly stock tracker application built with **Vite**, **React**, and **TypeScript**. This app allows users to monitor stock prices in real-time.

## 🚀 Features

- 📈 Real-time stock price updates.
- 📊 Historical data visualization using interactive charts.
- 🔍 Search and filter stocks by name.
- 🔔 Customizable price alerts.

## 🛠 Tech Stack

- **Frontend Framework:** React (with TypeScript for type safety)
- **Build Tool:** Vite (for fast development and builds)
- **Charting Library:** Recharts
- **Styling:** TailwindCSS / ShadCDN UI

---

## 📦 Installation

1. **Clone the repository:**
  ```bash
  git clone https://github.com/your-username/stock-tracker.git
  cd stock-tracker

2. **Install dependencies:**
  ```bash
  npm install

3. **Set up environment variables:**
  VITE_FINNHUB_API_KEY
  VITE_FINNHUB_API_BASE_URL
  VITE_FINNHUB_WEBSOCKET_BASE_URL
  VITE_LIVE_STOCK_MAX_ARRAY_SIZE

4. **Run the development server:**
  ```bash
  npm run dev

---

## 🌟 Usage

1. Search for a stock using the dropdown and set up a price alert.
2. Monitor real-time updates and historical data charts; if the price falls below the alert you set, it will appear in red, and if it's higher, it will be shown in green.
3. Change stock to track or price alert to stay updated.