import { useState } from "react";
import WorldMap from "./maps/WorldMap";

export default function App() {
  const [location] = useState<[number, number]>([
    -18.2413,
    -43.6012,
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema de Turismo Inteligente</h1>

      <WorldMap location={location} />
    </div>
  );
}