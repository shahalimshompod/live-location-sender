"use client";
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (receiveLatLon) => {
  const connectionRef = useRef(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    const isProd = window.location.hostname !== "localhost";
    const hubUrl = isProd
      ? "https://tech-test.raintor.com/Hub"
      : "/api/signalr";

    // making connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    // using connection
    connection
      .start()
      .then(() => {
        console.log("SignalR Connected");
        connection.on("receiveLatLon", receiveLatLon);
        connectionRef.current = connection;
      })
      .catch(console.error);

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
