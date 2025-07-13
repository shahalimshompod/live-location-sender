"use client";
import React, { useEffect, useState } from "react";

// 🧩 Import icons
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaGlobeAsia } from "react-icons/fa";
import { MdAccessTime, MdMergeType } from "react-icons/md";
import useSignalR from "../hooks/useSignalR";
import Map from "../components/Map";

export default function UserB() {
  const [location, setLocation] = useState({ lat: 23.78, lon: 90.4 });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [locationName, setLocationName] = useState("Fetching...");
  const [locationType, setLocationType] = useState({});

  //   getting extra info
  const locationCategory = locationType?.category;
  const addressType = locationType?.addressType;

  // 🔌 SignalR listener
  useSignalR((payload) => {
    if (payload?.lat && payload?.lon) {
      if (payload?.userName === "shahalimsompod@gmail.com") {
        setLocation({ lat: payload.lat, lon: payload.lon });
        setLastUpdated(new Date().toLocaleString());
      }
    }
  });

  // Reverse Geocode whenever lat/lon changes
  useEffect(() => {
    async function getLocationName(lat, lon) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        if (data?.display_name) {
          setLocationName(data.display_name);
          setLocationType(data);
          console.log(data);
        } else {
          setLocationName("Location name not found");
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setLocationName("Failed to fetch");
      }
    }

    if (location.lat && location.lon) {
      getLocationName(location.lat, location.lon);
    }
  }, [location.lat, location.lon]);

  return (
    <div className="min-h-[94vh] flex flex-col items-center justify-center p-6">
      {/* Heading */}
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-indigo-700">
        📡 User B: Real-Time Location Viewer
      </h1>

      {/* Info Card */}
      <div className="shadow-md p-6 text-sm w-full max-w-3xl mb-6 space-y-4 border border-base-100">
        {/* Location name */}
        <div className="flex items-start gap-3">
          <HiOutlineLocationMarker className="text-xl text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold text-white">Location Name:</p>
            <p className="text-white">{locationName}</p>
          </div>
        </div>

        {/* Latitude & Longitude */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FaGlobeAsia className="text-lg text-green-600" />
            <p>
              <span className="font-semibold">Latitude:</span>{" "}
              {location.lat.toFixed(6)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FaGlobeAsia className="text-lg text-green-600" />
            <p>
              <span className="font-semibold">Longitude:</span>{" "}
              {location.lon.toFixed(6)}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Last Updated */}
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-lg text-gray-500" />
            <p>
              <span className="font-semibold">Last Updated:</span>{" "}
              {lastUpdated || "Waiting for update..."}
            </p>
          </div>

          {/* location type */}
          <div className="flex items-center gap-2">
            <MdMergeType className="text-lg text-gray-500" />
            <p>
              <span className="font-semibold">Location/Address Type:</span>{" "}
              {locationCategory || addressType ? (
                <>
                  {locationCategory}
                  {locationCategory && addressType && " / "}
                  {addressType}
                </>
              ) : (
                "Waiting for update..."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-3xl">
        <Map lat={location.lat} lon={location.lon} />
      </div>
    </div>
  );
}
