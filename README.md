# Live Location Tracker App

A real-time web application for live location tracking built with Next.js, Leaflet, SignalR, and React. This project provides dynamic location updates on a map interface using WebSocket communication and modern frontend tools.

---

## 🚀 Table of Contents

- [Live Location Tracker App](#live-location-tracker-app)
  - [🚀 Table of Contents](#-table-of-contents)
  - [🧭 Introduction](#-introduction)
  - [✨ Features](#-features)
  - [⚙️ Tech Stack](#️-tech-stack)
  - [🛠️ Installation](#️-installation)
  - [⚙️ Configuration:](#️-configuration)
  - [💡 Examples](#-examples)
  - [🧩 Troubleshooting](#-troubleshooting)
  - [⚖️ Limitations and Tradeoffs](#️-limitations-and-tradeoffs)

---

## 🧭 Introduction

The **Live Location Tracker App** allows real-time monitoring of geographic locations using a React-based UI. Designed for live updates (e.g., delivery tracking or user movement), the app integrates Leaflet for map rendering and SignalR for real-time server communication.

---

## ✨ Features

- Real-time location updates via SignalR
- Interactive maps with Leaflet and React-Leaflet
- Query and caching with React Query
- Responsive UI with TailwindCSS and DaisyUI
- Lightweight and modern frontend using Next.js with Turbopack

---

## ⚙️ Tech Stack

**Framework & Libraries:**

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- [SignalR (Microsoft)](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [TailwindCSS 4](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Axios](https://axios-http.com/)

**Development Tools:**

- ESLint 9
- Turbopack (for faster dev builds)

---

## 🛠️ Installation

> Prerequisites: Node.js (v18 or later), npm or yarn

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/live-location-tracker-app.git
   cd live-location-tracker-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**:
   ```bash
   http://localhost:3000
   ```


**Framework & Libraries:**

- Use the app to track users or assets in real time.
- Ensure a SignalR-compatible server is running and integrated with your frontend (custom logic required).
- Customize the Leaflet map and UI as needed for your use case.


## ⚙️ Configuration:

**You may need to configure:**

- SignalR connection URL (likely in a .env.local or config file)
- Map center/default zoom level in your React Leaflet component
- Backend SignalR hub to emit location data

   **Environment Variables (example):**
   ```bash
   http://localhost:3000
   ```


## 💡 Examples

**Render Map with Live Marker (conceptual example):**
  ```bash
   <MapContainer center={[0, 0]} zoom={13}>
     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
     <Marker position={[latitude, longitude]} />
   </MapContainer>
  ```

**Connect to SignalR Hub:**
  ```bash
   const connection = new HubConnectionBuilder()
  .withUrl(process.env.NEXT_PUBLIC_SIGNALR_URL)
  .withAutomaticReconnect()
  .build();
  ```


## 🧩 Troubleshooting

- **Map not loading:** Ensure correct Leaflet CSS import.
- **No location updates:** Verify backend SignalR server is running and accessible.
- **CORS issues:** Configure proper headers on your SignalR backend.
- **TailwindCSS not working:** Check next.config.js and PostCSS(global.css) integration.


## ⚖️ Limitations and Tradeoffs

- **SignalR Required:** The app assumes a working SignalR server; it's not included.
- **No Offline Support:** Does not support offline caching of location data.
- **Frontend Only:** This repo focuses on the frontend; backend implementation is up to you.
- **Map Performance:** High-frequency updates with many markers may degrade performance.