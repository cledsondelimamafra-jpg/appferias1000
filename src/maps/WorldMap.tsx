import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet'

import { useEffect, useState } from 'react'

import { getWeather } from '../services/weather'

import { getTourism } from '../services/tourism'

function ChangeMap({ position }: any) {

  const map = useMap()

  useEffect(() => {

    if (position) {

      map.flyTo(position, 10, {
        duration: 2
      })
    }

  }, [position])

  return null
}

export default function WorldMap({
  location
}: any) {

  const [weather, setWeather] = useState<any>(null)

  const [tourism, setTourism] = useState<any[]>([])

  const position = location
    ? [location.lat, location.lon]
    : [-14.235, -51.9253]

  useEffect(() => {

    async function loadData() {

      if (!location) return

      try {

        const weatherData =
          await getWeather(
            location.lat,
            location.lon
          )

        const tourismData =
          await getTourism(
            location.lat,
            location.lon
          )

        setWeather(weatherData)

        setTourism(tourismData)

      } catch (error) {

        console.log(error)
      }
    }

    loadData()

  }, [location])

  return (

    <MapContainer
      center={[-14.235, -51.9253]}
      zoom={4}
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '20px'
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <ChangeMap position={position} />

      {location && (

        <Marker position={position}>

          <Popup>

            <div
              style={{
                minWidth: '250px'
              }}
            >

              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}
              >
                {weather?.name}
              </h2>

              <p>
                🌡️ Temperatura:
                {' '}
                {weather?.main?.temp} °C
              </p>

              <p>
                ☁️ Clima:
                {' '}
                {weather?.weather?.[0]?.description}
              </p>

              <p>
                🌍 País:
                {' '}
                {weather?.sys?.country}
              </p>

              <hr
                style={{
                  marginTop: '10px',
                  marginBottom: '10px'
                }}
              />

              <h3
                style={{
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}
              >
                🏖️ Pontos turísticos
              </h3>

              <ul
                style={{
                  paddingLeft: '15px'
                }}
              >

                {tourism.map((item, index) => (

                  <li
                    key={index}
                    style={{
                      marginBottom: '5px'
                    }}
                  >
                    • {item.name || 'Local turístico'}
                  </li>

                ))}

              </ul>

            </div>

          </Popup>

        </Marker>

      )}

    </MapContainer>
  )
}
