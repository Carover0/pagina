const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/textmode', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Falta URL');

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    $('script, style, img, iframe, noscript').remove();

    const textOnly = $('body').text();
    const links = $('a')
      .map((i, el) => `- ${$(el).text() || '[enlace]'}: ${$(el).attr('href')}`)
      .get()
      .join('\n');

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(`
======= CONTENIDO DE ${targetUrl} =======

${textOnly.trim()}

======= ENLACES =======
${links}
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar la página.');
  }
});

app.listen(10000, () => {
  console.log('Servidor escuchando en puerto 10000');
});
