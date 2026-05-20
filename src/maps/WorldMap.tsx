import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const icon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = icon;

// 🌍 mover mapa automaticamente
function FlyTo({ coords }: { coords: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 11, { duration: 1.5 });
    }
  }, [coords]);

  return null;
}

type Props = {
  city?: string;
  center?: [number, number];
  places?: { name: string; lat: number; lon: number }[];
};

export default function WorldMap({ city, center, places = [] }: Props) {
  const defaultCenter: [number, number] = [-14.235, -51.9253];

  return (
    <div style={{ height: "100%" }}>
      <MapContainer
        center={center || defaultCenter}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔥 movimento do mapa */}
        {center && <FlyTo coords={center} />}

        {/* marcador principal */}
        {center && (
          <Marker position={center}>
            <Popup>📍 {city}</Popup>
          </Marker>
        )}

        {/* pontos reais */}
        {places.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lon]}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}