export async function getPlaces(city: string) {
  try {
    // 🌍 Overpass API (dados reais de turismo)
    const query = `
      [out:json];
      area["name"="${city}"]->.a;
      (
        node["tourism"](area.a);
        way["tourism"](area.a);
        relation["tourism"](area.a);
      );
      out center 7;
    `;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await res.json();

    if (!data?.elements) return [];

    return data.elements.map((el: any) => ({
      name: el.tags?.name || "Ponto turístico",
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}