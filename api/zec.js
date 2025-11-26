async function cargarZEC() {
    const salida = document.getElementById("output");

    try {
        const r = await fetch("https://hosh.zec.rocks/api/v0/zec.json");
        const json = await r.json();

        // Filtrar SOLO tu servidor
        const nodo = json.find(n => n.hostname === "carover0.xyz");

        if (!nodo) {
            salida.textContent = "Error: nodo carover0.xyz no encontrado";
            return;
        }

        // Mostrar datos estilo consola
        salida.textContent =
            "Consola ZEC\n" +
            "-------------------------\n" +
            `Hostname: ${nodo.hostname}\n` +
            `Port: ${nodo.port}\n` +
            `Country: ${nodo.country}\n` +
            `Height: ${nodo.height}\n` +
            `Version: ${nodo.version}\n` +
            `Protocol: ${nodo.protocol}\n` +
            `Synced: ${nodo.synced}\n`;
    }
    catch (e) {
        salida.textContent = "Error: no se pudo obtener datos";
    }
}

// Actualizar cada 10 segundos
setInterval(cargarZEC, 10000);
cargarZEC();


