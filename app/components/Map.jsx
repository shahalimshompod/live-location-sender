"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// setting map icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const Map = ({ lat, lon }) => {
  // setting custom icon over default icon
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
    </MapContainer>
  );
};

export default Map;
