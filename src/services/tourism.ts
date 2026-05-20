import axios from 'axios'

const API_KEY = '5ae2e3f221c38a28845f05b64cf3101dbe3efa692c5b1d31e96dc24b'

export async function getTourism(
  lat: number,
  lon: number
) {

  const response = await axios.get(
    `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&rate=2&format=json&limit=7&apikey=${API_KEY}`
  )

  return response.data
}
