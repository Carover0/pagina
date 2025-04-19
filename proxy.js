const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const q = req.query.q;
  const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(q)}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    res.send(html); // O parseás y extraés resultados
  } catch (err) {
    res.status(500).send('Error buscando.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));
