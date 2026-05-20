import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
  location?: [number, number];
};

export default function WorldMap({ location }: Props) {
  const position: [number, number] =
    location ?? [-18.2413, -43.6012]; // fallback Diamantina - MG

  return (
    <div style={{ height: "500px", width: "100%", borderRadius: "12px" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            Você está aqui 📍 <br />
            Sistema de Turismo Inteligente ✈️
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}