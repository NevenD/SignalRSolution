# 🛰️ Real-Time Location Tracking with ASP.NET Core SignalR and OpenLayers

This project demonstrates a real-time location broadcasting system using **ASP.NET Core 9**, **SignalR**, and **OpenLayers**. It simulates live geolocation updates on a web map, broadcasting coordinates to all connected clients.


- 🔧 **ASP.NET Core 9** for the backend
- ⚡ **SignalR** for real-time messaging
- 🌐 **Angular** for the frontend
- 🗺️ **OpenLayers** for interactive map rendering
---

## 📦 Features

- 🔄 Real-time location updates using SignalR
- 🗺️ Interactive map display with OpenLayers
- ⚙️ Background location simulation with `BackgroundService`
- 📡 Broadcasts to all connected clients

---

## 🧰 Technologies Used

| Tool/Library         | Purpose                                    |
|----------------------|--------------------------------------------|
| ASP.NET Core 9       | Backend API & SignalR Hub                  |
| SignalR              | Real-time communication                    |
| BackgroundService    | Server-side push of location updates       |
| Angular              | Frontend SPA framework                     |
| OpenLayers           | Map display in Angular component           |
| @microsoft/signalr   | SignalR JS client for Angular              |

---

## 🔧 How It Works

1. The backend uses a `BackgroundService` to simulate random coordinates.
2. These are pushed to all clients via `SignalR` every few seconds.
3. Angular connects to the hub using `@microsoft/signalr`.
4. The `map.component.ts` updates an OpenLayers marker with the received location.

---

## 🚀 Getting Started

### 🛠 Backend (ASP.NET Core)

```bash
dotnet restore
dotnet run
```

### 🌐 Frontend (Angular)

```bash
npm install
ng serve
```
