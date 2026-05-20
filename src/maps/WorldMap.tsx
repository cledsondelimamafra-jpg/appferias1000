import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige ícone padrão do Leaflet (problema comum no Vite)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Coordenadas (Diamantina - MG como exemplo)
const position: [number, number] = [-18.2413, -43.6012];

export default function WorldMap() {
  return (
    <div style={{ height: "500px", width: "100%", borderRadius: "12px" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            Diamantina - MG 🇧🇷 <br />
            Seu sistema de turismo aqui ✈️
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}