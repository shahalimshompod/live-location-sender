import React from "react";
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (receiveLatLon) => {
  // initializing connection reference
  const connectionRef = useRef(null);

  useEffect(() => {
    // making connection with the connection link provided
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://tech-test.raintor.com/Hub")
      .withAutomaticReconnect()
      .build();

    // using connection
    connection
      .start()
      .then(() => {
        console.log("SignalR connected");

        connection.on("receiveLatLon", (payload) => {
          console.log("received payload", payload);
          receiveLatLon(payload);
        });

        connectionRef.current = connection;
      })
      .catch((err) => console.error("SignalR error ->", err));

    return () => {
      connection.stop();
    };
  }, []);

  //   send the data
  const sendLatLon = (lat, lon, userName) => {
    if (connectionRef.current) {
      connectionRef.current.invoke("sendLatLon", lat, lon, userName);
    }
  };

  return { sendLatLon };
};

export default useSignalR;
