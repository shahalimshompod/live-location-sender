"use client";
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { HttpTransportType } from "@microsoft/signalr";

const useSignalR = (receiveLatLon) => {
  const connectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isProd = window.location.hostname !== "localhost";
    const hubUrl = isProd
      ? "https://tech-test.raintor.com/Hub"
      : "/api/signalr";

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: HttpTransportType.WebSockets, // use WebSocket only
        withCredentials: true, // allow secure cookies if needed
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("SignalR Connected");
        connection.on("receiveLatLon", receiveLatLon);
        connectionRef.current = connection;
      })
      .catch((err) => {
        console.error("Failed to connect:", err);
      });

    // 🔄 Connection status listeners
    connection.onclose((err) => {
      console.warn("🔌 SignalR disconnected", err);
    });

    connection.onreconnecting((err) => {
      console.warn("SignalR reconnecting...", err);
    });

    connection.onreconnected(() => {
      console.log("SignalR reconnected");
    });

    return () => {
      if (connection) connection.stop();
    };
  }, [receiveLatLon]);

  const sendLatLon = (lat, lon, userName) => {
    if (connectionRef.current) {
      connectionRef.current.invoke("sendLatLon", lat, lon, userName);
    }
  };

  return { sendLatLon };
};

export default useSignalR;
