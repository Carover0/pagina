const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');            // ①
const app = express();
const PORT = process.env.PORT;

app.use(cors());                         // ②
app.use(express.static('public'));

app.get('/duck', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Falta parámetro q' });

  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1`);
    const data = await response.json();

    const results = (data.RelatedTopics || []).map(item => ({
      title: item.Text,
      url:   item.FirstURL,
      snippet: item.Text
    })).filter(r => r.title && r.url);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error buscando en DuckDuckGo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

