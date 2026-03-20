## 📈 Stock Market Dashboard
A responsive stocks React page built with Next.js and Tailwind CSS. This project was developed for a take home assessment for the TensorWave Internship.

---

## 🚀 Features
* **Dynamic Stock Grid:** Interactive cards for 15 stock companies with their logos.

* **Real-time Data Fetching:** Integrated with the Alpha Vantage API to fetch company overviews and daily data.

* **Responsive Architecture:** Responsive design on mobile, tablet, and desktop using Tailwind's responsive modifiers (sm:, md:, lg:)

* **Interactive Price Action Charts:** Integrated Recharts to visualize past 100 days of historical price closures. Includes a custom-styled Line Graph, featuring responsive containers and interactive tooltips.

---

## 🛠️ Tech Stack
* Framework: Next.js (App Router)

* Styling: Tailwind CSS

* Data Visualization: Recharts (Responsive Line Charts)

* Data Source: Alpha Vantage API

---

## 🏁 Getting Started
### 1. Prerequisites

* Node.js
* An Alpha Vantage API Key (Get one here https://www.alphavantage.co/support/#api-key) 

### 2. Installation

```bash
git clone https://github.com/devinjathan/tensorwave-stocks-tracker.git
cd tensorwave-stocks-tracker
npm install
```

### 3. Environment Variables

Create a .env.local file in the root directory and add your API key:

Code snippet
```
ALPHAVANTAGE_KEY=your_api_key_here
```

### 4. Run Development Server

```Bash
npm run dev
Open http://localhost:3000 to view the application.
```

## 📝 Author

**Devin Custodio**