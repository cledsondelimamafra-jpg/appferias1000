import axios from 'axios'

export async function getLocation(city: string) {

  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
  )

  return response.data[0]
}
