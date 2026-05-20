import { useState } from 'react'

import { Mic } from 'lucide-react'

import WorldMap from './maps/WorldMap'

import { startSpeech } from './voice/speech'

import { getLocation } from './services/location'

export default function App() {

  const [location, setLocation] = useState<any>(null)

  async function handleVoice() {

    startSpeech(async (text) => {

      const city =
        text
          .replace('mostrar', '')
          .replace('ir para', '')
          .trim()

      const data =
        await getLocation(city)

      setLocation({
        lat: Number(data.lat),
        lon: Number(data.lon),
        name: city
      })
    })
  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white p-6">

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-4xl font-bold">
          Férias 1000 🌎
        </h1>

        <button
          onClick={handleVoice}
          className="bg-blue-600 p-4 rounded-full"
        >
          <Mic />
        </button>

      </div>

      <div className="bg-zinc-900 p-4 rounded-2xl">

        <h2 className="text-2xl mb-4">
          Explorar
        </h2>

        <WorldMap
          location={location}
        />

      </div>

    </div>
  )
}
