"use client";
import useSignalR from "@/app/hooks/useSignalR";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser, FaMapPin, FaHistory, FaClock, FaSignal } from "react-icons/fa";

export default function Page() {
  const [lat, setLat] = useState("Generating...");
  const [lon, setLon] = useState("Generating...");
  const [lastSent, setLastSent] = useState(null);
  const [history, setHistory] = useState([]);
  const [autoSend, setAutoSend] = useState(true);
  const [connected, setConnected] = useState(false);
  const [mapBtn, setMapBtn] = useState(false);

  const { sendLatLon } = useSignalR(() => {}, setConnected);

  // manual sender through button
  const sendNow = () => {
    const newLat = 23.78 + Math.random() * 0.01;
    const newLon = 90.4 + Math.random() * 0.01;

    sendLatLon(newLat, newLon, "sompod@example.com"); // Replace with your real email
    console.log("📤 Sent:", newLat, newLon);

    const now = new Date();
    setLastSent(now.toLocaleString());
    setLat(newLat.toFixed(6));
    setLon(newLon.toFixed(6));

    setHistory((prev) => {
      const updated = [
        { lat: newLat, lon: newLon, time: now.toLocaleTimeString() },
        ...prev,
      ];
      return updated.slice(0, 5);
    });
  };

  useEffect(() => {
    if (!autoSend) return;
    const interval = setInterval(() => {
      setConnected(true);
      setMapBtn(true);
      sendNow();
    }, 3000);
    return () => clearInterval(interval);
  }, [autoSend]);

  return (
    <div className="container mx-auto h-auto min-h-[94vh] flex flex-col items-center justify-center p-4">
      <div className="border border-base-200 p-6 max-w-xl w-full space-y-4 ">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-600">
          <FaUser /> User A: Real-Time Location Sender
        </h2>

        <p className="flex items-center gap-2 ">
          <FaMapPin className="text-red-500" />
          <span>Latitude:</span>
          <span className="font-mono">{lat}</span>
        </p>
        <p className="flex items-center gap-2 ">
          <FaMapPin className="text-red-500" />
          <span>Longitude:</span>
          <span className="font-mono">{lon}</span>
        </p>

        <p className="flex items-center gap-2 ">
          <FaClock className="text-blue-500" />
          <span>Last Sent:</span>
          <span>{lastSent || "Not yet sent"}</span>
        </p>

        <p className="flex items-center gap-2 text-gray-600">
          <FaSignal className={connected ? "text-green-500" : "text-red-500"} />
          <span>Status:</span>
          <span>{connected ? "Connected ✅" : "Disconnected ❌"}</span>
        </p>

        <div className="flex items-center gap-3">
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoSend}
              onChange={(e) => setAutoSend(e.target.checked)}
            />
            Auto Send Every 3s
          </label>

          {!autoSend && (
            <button
              onClick={sendNow}
              className="bg-transparent border border-base-100 hover:bg-base-100 text-white text-sm px-4 py-2 cursor-pointer"
            >
              📤 Send Now
            </button>
          )}
        </div>

        <div className="mt-4">
          <h4 className="text-md font-semibold flex items-center gap-2 mb-2">
            <FaHistory className="text-gray-700" />
            Last 5 Sent Locations:
          </h4>
          <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
            {history.length === 0 ? (
              <li>No history yet</li>
            ) : (
              history.map((item, i) => (
                <li key={i}>
                  {item.lat.toFixed(6)}, {item.lon.toFixed(6)} — {item.time}
                </li>
              ))
            )}
          </ul>
        </div>
        {mapBtn && (
          <button className="btn w-full bg-transparent hover:bg-base-100 border border-base-100 rounded-none">
            <Link target="_blank" href={"/pages/user_b"}>
              View Location In Map
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}
