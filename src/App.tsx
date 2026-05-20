import WorldMap from "./maps/WorldMap";
import { useState } from "react";
import { getPlaces } from "./services/tourism";
import { getWeather } from "./services/weather";

export default function App() {
  const [city, setCity] = useState("");
  const [voice, setVoice] = useState("🎤 Clique no microfone");
  const [weather, setWeather] = useState("🌡️ Aguardando...");
  const [places, setPlaces] = useState<any[]>([]);
  const [center, setCenter] = useState<[number, number] | undefined>();

  // 🎤 MICROFONE
  function startVoice() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoice("❌ Microfone não suportado");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;

    recognition.start();

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;

      setCity(text);
      setVoice("🎤 Você disse: " + text);

      // 🌍 GEOLOCALIZAÇÃO
      const geo = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}`
      );

      const data = await geo.json();

      if (data?.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        setCenter([lat, lon]);

        // 🌡️ CLIMA REAL
        const w = await getWeather(lat, lon);
        if (w) {
          setWeather(`🌡️ ${w.temp}°C | vento ${w.wind} km/h`);
        }

        // 📍 PONTOS REAIS
        const p = await getPlaces(text);
        setPlaces(p);
      }
    };
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      <header style={{ padding: 10, background: "#111", color: "#fff" }}>
        🌍 Sistema de Turismo Inteligente PRO
      </header>

      <div style={{ display: "flex", flex: 1 }}>

        {/* MAPA */}
        <div style={{ flex: 2 }}>
          <WorldMap
            city={city}
            center={center}
            places={places}
          />
        </div>

        {/* PAINEL */}
        <div style={{ flex: 1, padding: 10, background: "#f4f4f4" }}>

          <h3>🎤 Voz</h3>
          <button onClick={startVoice}>Ativar Microfone</button>
          <p>{voice}</p>

          <h3>🌡️ Clima</h3>
          <p>{weather}</p>

          <h3>📍 Pontos turísticos reais</h3>
          <ul>
            {places.map((p, i) => (
              <li key={i}>{p.name}</li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}