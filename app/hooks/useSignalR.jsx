import React, { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (receiveLatLon) => {
  const connectionRef = useRef(null);

  useEffect(() => {
    // Check if running in production or development
    const isProd =
      typeof window !== "undefined" && window.location.hostname !== "localhost";

    // Set the correct SignalR hub URL depending on environment
    const hubUrl = isProd
      ? "https://tech-test.raintor.com/Hub" // Production URL
      : "/api/signalr"; // Local dev proxy path

    // Build SignalR connection with automatic reconnect
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    // Start the connection and listen for messages
    connection
      .start()
      .then(() => {
        console.log("SignalR connected");

        // Handle incoming data from the server
        connection.on("receiveLatLon", (payload) => {
          console.log("Payload received:", payload);
          receiveLatLon(payload); // Pass data to callback
        });

        // Save connection reference for later use
        connectionRef.current = connection;
      })
      .catch((err) => console.error("SignalR error ->", err));

    // Clean up connection on component unmount
    return () => {
      if (connection) connection.stop();
    };
  }, []);

  // Send data to the server
  const sendLatLon = (lat, lon, userName) => {
    if (connectionRef.current) {
      connectionRef.current.invoke("sendLatLon", lat, lon, userName);
    }
  };

  return { sendLatLon };
};

export default useSignalR;
