export async function getWeather(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const data = await res.json();

    if (!data?.current_weather) return null;

    return {
      temp: data.current_weather.temperature,
      wind: data.current_weather.windspeed,
    };
  } catch (err) {
    return null;
  }
}