"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/app/lib/leafletIcons";
import { areaCenters } from "@/app/data/areaCenters";

export default function LocationMapClient({ properties, area }) {
  const validProperties = properties.filter(
    p => typeof p.lat === "number" && typeof p.lng === "number"
  );

  const center =
    areaCenters[area] ||
    (validProperties.length
      ? [validProperties[0].lat, validProperties[0].lng]
      : [9.0765, 7.3986]); // Abuja fallback

  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validProperties.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <strong>{p.title}</strong>
              <br />
              {p.area.toUpperCase()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
