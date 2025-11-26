export default async function handler(req, res) {
  try {
    const r = await fetch("https://hosh.zec.rocks/api/v0/zec.json");
    const json = await r.json();

    // Filtramos SOLO tu servidor
    const nodo = json.find(n => n.hostname === "carover0.xyz");

    if (!nodo) {
      return res.status(404).json({ error: "Nodo no encontrado" });
    }

    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=5");
    res.json(nodo);

  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener ZEC" });
  }
}
