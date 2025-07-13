"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to update map center dynamically
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (map && lat && lon) {
      map.setView([lat, lon], map.getZoom());
    }
  }, [lat, lon, map]);

  return null;
};

const Map = ({ lat, lon }) => {
  // set custom marker icon globally (just once)
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({ iconUrl: icon.options.iconUrl });
  }, []);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]} icon={icon}>
        <Popup>Live Location</Popup>
      </Marker>

      {/* 🔁 Keep map centered on new location updates */}
      <RecenterMap lat={lat} lon={lon} />
    </MapContainer>
  );
};

export default Map;
