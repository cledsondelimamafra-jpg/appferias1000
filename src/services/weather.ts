import axios from 'axios'

const API_KEY = 'acc3120a7a5cdbff08e94710972ada23'

export async function getWeather(lat: number, lon: number) {

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
  )

  return response.data
}
