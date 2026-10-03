const TRANSLATIONS = {
    es: {
        "explorer.prefork_notice": "Bloque heredado de Bitcoin",
	    "explorer.prefork_notice_tx": "Transacción heredada de Bitcoin",
        "common.nav.node":              "[NODO]",
        "common.nav.explorer":          "[EXPLORADOR]",
        "common.nav.console":           "[CONSOLA]",
        "common.nav.blocks":            "[BLOQUES]",
        "common.nav.home":              "[INICIO]",
        "common.nav.logs":              "[LOGS]",

        "common.btn.blocks":            "🧱 Bloques en tiempo real",
        "common.btn.update":            "↻ Actualizar",
        "common.btn.updating":          "↻ Actualizando...",
        "common.btn.copy":              "copiar",

        "common.label.height":          "ALTURA",
        "common.label.difficulty":      "DIFICULTAD",
        "common.label.connections":     "CONEXIONES",
        "common.label.mempool":         "MEMPOOL",
        "common.label.version":         "VERSIÓN",
        "common.label.status":          "ESTADO",
        "common.label.blocks":          "ALTURA",
        "common.label.uptime":          "TIEMPO EN LÍNEA",
        "common.label.hashrate":        "HASHRATE",
        "common.label.chain":           "CADENA",
        "common.label.bestblock":       "ÚLTIMO BLOQUE",
        "common.label.time":            "HORA",
        "common.label.price":           "PRECIO",
        "common.label.price_usd":       "PRECIO USD",
        "common.label.marketcap":       "MARKET CAP",
        "common.label.volume":          "VOLUMEN 24h",
        "common.label.updated":         "ACTUALIZADO",
        "common.label.server":          "SERVIDOR",
        "common.label.port":            "PUERTO",
        "common.label.tls":             "TLS",
        "common.label.response":        "RESPUESTA",
        "common.label.address":         "dirección",
        "common.label.size":            "Tamaño",

        "common.unit.tx":               "tx",
        "common.unit.block":            "Bloque",
        "common.unit.blocks":           "bloques",
        "common.unit.day":              "d",
        "common.unit.hour":             "h",
        "common.unit.min":              "min",
        "common.unit.days":             "días",
        "common.unit.hours":            "horas",
        "common.unit.min_short":        "min",
        "common.unit.secs":             "seg",
        "common.unit.in":               "IN",
        "common.unit.out":              "OUT",

        "common.state.synced":          "SINCRONIZADO",
        "common.state.syncing":         "SINCRONIZANDO",
        "common.state.online":          "ONLINE",
        "common.state.offline":         "OFFLINE",
        "common.state.checking":        "Comprobando...",
        "common.state.enabled":         "HABILITADO",
        "common.state.error":           "Error",
        "common.state.connection_error":"ERROR DE CONEXIÓN",
        "common.state.unknown":         "desconocido",

        "common.footer.realtime":       "actualizado en tiempo real",
        "common.footer.api":            "API ·",
        "common.footer.mainnet":        "BCH mainnet",
        "common.footer.updated_at":     "actualizado",
        "common.footer.loading":        "cargando",

        "common.copy.ok":               "✓ copiado",
        "common.error.connection":      "Error de conexión",
        "common.error.no_result":       "sin resultado",
        "common.error.connection_prefix": "⚠️ Error de conexión:",

        "bch.title_short":              "bloques en vivo",
        "bch.stats.difficulty":         "⛏️ Dificultad",
        "bch.stats.mempool":            "📦 Mempool",
        "bch.stats.last_block":         "🔗 Último bloque",
        "bch.block_prefix":             "Bloque #",
        "bch.update_ago":               "actualizado",
        "bch.loading":                  "⏳ Cargando bloques desde el nodo BCH...",
        "bch.miner":                    "Minero",
        "bch.tx_count":                 "Transacciones",
        "bch.size":                     "Tamaño",
        "bch.difficulty":               "Dificultad",
        "bch.view_explorer":            "🔗 ver en explorador",
        "bch.miner_unknown":            "Desconocido",
        "bch.mempool.empty":            "vacío",
        "bch.mempool.low":              "bajo",
        "bch.mempool.normal":           "normal",
        "bch.mempool.high":             "alto",
        "bch.mempool.congested":        "congestionado",
        "bch.mempool.loading":          "cargando",
        "bch.mempool.error":            "error",
        "bch.mempool.error_conn":       "error de conexión",
        "bch.mempool.data":             "en datos",
        "bch.mempool.ram":              "RAM",
        "bch.mempool.vacio":            "vacío",
        "bch.no_blocks":                "⚠️ No se encontraron bloques",
        "bch.updated_at":               "actualizado",

        "consola.title_short":          "consola RPC",
        "consola.help.simple_title":    "COMANDOS BÁSICOS (sin parámetros)",
        "consola.help.params_title":    "COMANDOS CON PARÁMETROS",
        "consola.help.param_height":    "<altura>",
        "consola.help.param_hash":      "<hash>",
        "consola.help.param_txid":      "<txid>",
        "consola.help.param_address":   "<dirección>",
        "consola.help.param_vout":      "<vout>",
        "consola.placeholder":          "Listo para ejecutar comandos...",
        "consola.executing":            "ejecutando:",
        "consola.copy_btn":             "[F8] copiar resultado",
        "consola.shortcut_run":         "Enter",
        "consola.shortcut_run_label":   "ejecutar",
        "consola.shortcut_copy":        "F8",
        "consola.shortcut_copy_label":  "copiar",
        "consola.shortcut_clear":       "F9",
        "consola.shortcut_clear_label": "limpiar",

        "explorer.title_short":         "explorador",
        "explorer.back":                "← volver",
        "explorer.search_placeholder":  "bloque · hash · txid · dirección",
        "explorer.placeholder_title":   "explorador de bloques BCH",
        "explorer.placeholder_sub":     "bloque · transacción · dirección",
        "explorer.loading":             "consultando red…",
        "explorer.cmd_error":           "error",
        "explorer.no_result":           "sin resultado",
        "explorer.tag_block":           "⧫ BLOQUE",
        "explorer.tag_address":         "◈ DIRECCIÓN",
        "explorer.tag_not_found":       "✕",
        "explorer.label_hash":          "hash",
        "explorer.label_date":          "fecha",
        "explorer.label_difficulty":    "dificultad",
        "explorer.label_size":          "tamaño",
        "explorer.label_previous":      "anterior",
        "explorer.label_next":          "siguiente",
        "explorer.label_transactions":  "transacciones",
        "explorer.label_outputs":       "salidas",
        "explorer.label_inputs":        "entradas",
        "explorer.label_txid":          "TXID",
        "explorer.label_block":         "bloque",
        "explorer.label_confirmations": "confirmaciones",
        "explorer.label_version":       "versión",
        "explorer.label_type":          "tipo",
        "explorer.label_unconfirmed":   "no confirmada",
        "explorer.label_fee":           "■ FEE",
        "explorer.label_total_in":      "total entrada",
        "explorer.label_total_out":     "total salida",
        "explorer.label_summary":       "RESUMEN",
        "explorer.label_inputs_short":  "entradas",
        "explorer.label_outputs_short": "salidas",
        "explorer.label_address":       "Dirección",
        "explorer.label_validate":      "Validar",
        "explorer.label_block_prefix":  "Bloque",
        "explorer.section_inputs":      "▶ ENTRADAS",
        "explorer.section_outputs":     "◀ SALIDAS",
        "explorer.tx_type_coinbase":    "⛏ COINBASE",
        "explorer.tx_type_transparent": "▸ transparente",
        "explorer.tx_type_unknown":     "▸ desconocida",
        "explorer.tx_type_coinbase_short":"Coinbase",
        "explorer.tx_type_transparent_short":"Transparente",
        "explorer.tag_coinbase":        "COINBASE",
        "explorer.tag_input":           "entrada",
        "explorer.tag_op_return":       "OP_RETURN/otro",
        "explorer.copy_result":         "[ copiar ]",
        "explorer.ok_validate":         "sí",
        "explorer.error_validate":      "no",
        "explorer.is_valid":            "válida",
        "explorer.is_mine":             "pertenece a wallet",
        "explorer.no_hash_found":       "No se encontró bloque ni transacción con hash",
        "explorer.shortcut_copy":       "F8",
        "explorer.shortcut_copy_label": "copiar",
        "explorer.shortcut_clear":      "F9",
        "explorer.shortcut_clear_label":"limpiar",

        "nodo.title_short":             "monitor",
        "nodo.panel_title":             "MONITOR DE NODO BCH",
        "nodo.card.node_state":         "Nodo · Estado",
        "nodo.card.network":            "Nodo · Red",
        "nodo.card.market":             "BCH · Mercado",
        "nodo.card.cert":               "Certificado SSL",
        "nodo.cert.issuer":             "EMISOR",
        "nodo.cert.subject":            "DOMINIO",
        "nodo.cert.valid_from":         "VÁLIDO DESDE",
        "nodo.cert.valid_to":           "VÁLIDO HASTA",
        "nodo.cert.days":               "DÍAS RESTANTES",
        "nodo.label.24h":               "24h %",
        "nodo.label.7d":                "7d %",
        "nodo.label.vol_24h":           "VOLUMEN 24h",
        "nodo.note_default":            "Este nodo BCH está sincronizando la blockchain. Los datos se actualizan cada 5 minutos.",
        "nodo.note_syncing":            "El nodo está sincronizando la blockchain. Bloques pendientes:",
        "nodo.note_ok":                 "El nodo está totalmente sincronizado. Datos actualizados cada 5 minutos.",
        "nodo.footer.colabora":         "[COLABORA]",
        "nodo.colabora.title":          "COLABORA CON EL NODO",
        "nodo.colabora.desc":           "Si queres apoyar el mantenimiento de este nodo y servicios, podes enviar BCH a cualquiera de estas direcciones:",
        "nodo.colabora.copy":           "Copiar",
        "nodo.colabora.copied":         "¡Copiado!",
        "nodo.colabora.thanks":         "¡Gracias por tu apoyo! ❤️"
    },

    en: {
    	"explorer.prefork_notice": "Legacy Bitcoin block",
	    "explorer.prefork_notice_tx": "Legacy Bitcoin transaction",
        "common.nav.node":              "[NODE]",
        "common.nav.explorer":          "[EXPLORER]",
        "common.nav.console":           "[CONSOLE]",
        "common.nav.blocks":            "[BLOCKS]",
        "common.nav.home":              "[HOME]",
        "common.nav.logs":              "[LOGS]",

        "common.btn.blocks":            "🧱 Live blocks",
        "common.btn.update":            "↻ Refresh",
        "common.btn.updating":          "↻ Refreshing...",
        "common.btn.copy":              "copy",

        "common.label.height":          "HEIGHT",
        "common.label.difficulty":      "DIFFICULTY",
        "common.label.connections":     "CONNECTIONS",
        "common.label.mempool":         "MEMPOOL",
        "common.label.version":         "VERSION",
        "common.label.status":          "STATUS",
        "common.label.blocks":          "HEIGHT",
        "common.label.uptime":          "UPTIME",
        "common.label.hashrate":        "HASHRATE",
        "common.label.chain":           "CHAIN",
        "common.label.bestblock":       "BEST BLOCK",
        "common.label.time":            "TIME",
        "common.label.price":           "PRICE",
        "common.label.price_usd":       "PRICE USD",
        "common.label.marketcap":       "MARKET CAP",
        "common.label.volume":          "24h VOLUME",
        "common.label.updated":         "UPDATED",
        "common.label.server":          "SERVER",
        "common.label.port":            "PORT",
        "common.label.tls":             "TLS",
        "common.label.response":        "RESPONSE",
        "common.label.address":         "address",
        "common.label.size":            "Size",

        "common.unit.tx":               "tx",
        "common.unit.block":            "Block",
        "common.unit.blocks":           "blocks",
        "common.unit.day":              "d",
        "common.unit.hour":             "h",
        "common.unit.min":              "min",
        "common.unit.days":             "days",
        "common.unit.hours":            "hours",
        "common.unit.min_short":        "min",
        "common.unit.secs":             "sec",
        "common.unit.in":               "IN",
        "common.unit.out":              "OUT",

        "common.state.synced":          "SYNCED",
        "common.state.syncing":         "SYNCING",
        "common.state.online":          "ONLINE",
        "common.state.offline":         "OFFLINE",
        "common.state.checking":        "Checking...",
        "common.state.enabled":         "ENABLED",
        "common.state.error":           "Error",
        "common.state.connection_error":"CONNECTION ERROR",
        "common.state.unknown":         "unknown",

        "common.footer.realtime":       "updated in real time",
        "common.footer.api":            "API ·",
        "common.footer.mainnet":        "BCH mainnet",
        "common.footer.updated_at":     "updated",
        "common.footer.loading":        "loading",

        "common.copy.ok":               "✓ copied",
        "common.error.connection":      "Connection error",
        "common.error.no_result":       "no result",
        "common.error.connection_prefix": "⚠️ Connection error:",

        "bch.title_short":              "live blocks",
        "bch.stats.difficulty":         "⛏️ Difficulty",
        "bch.stats.mempool":            "📦 Mempool",
        "bch.stats.last_block":         "🔗 Latest block",
        "bch.block_prefix":             "Block #",
        "bch.update_ago":               "updated",
        "bch.loading":                  "⏳ Loading blocks from BCH node...",
        "bch.miner":                    "Miner",
        "bch.tx_count":                 "Transactions",
        "bch.size":                     "Size",
        "bch.difficulty":               "Difficulty",
        "bch.view_explorer":            "🔗 view in explorer",
        "bch.miner_unknown":            "Unknown",
        "bch.mempool.empty":            "empty",
        "bch.mempool.low":              "low",
        "bch.mempool.normal":           "normal",
        "bch.mempool.high":             "high",
        "bch.mempool.congested":        "congested",
        "bch.mempool.loading":          "loading",
        "bch.mempool.error":            "error",
        "bch.mempool.error_conn":       "connection error",
        "bch.mempool.data":             "of data",
        "bch.mempool.ram":              "RAM",
        "bch.mempool.vacio":            "empty",
        "bch.no_blocks":                "⚠️ No blocks found",
        "bch.updated_at":               "updated",

        "consola.title_short":          "RPC console",
        "consola.help.simple_title":    "BASIC COMMANDS (no params)",
        "consola.help.params_title":    "COMMANDS WITH PARAMS",
        "consola.help.param_height":    "<height>",
        "consola.help.param_hash":      "<hash>",
        "consola.help.param_txid":      "<txid>",
        "consola.help.param_address":   "<address>",
        "consola.help.param_vout":      "<vout>",
        "consola.placeholder":          "Ready to run commands...",
        "consola.executing":            "running:",
        "consola.copy_btn":             "[F8] copy result",
        "consola.shortcut_run":         "Enter",
        "consola.shortcut_run_label":   "run",
        "consola.shortcut_copy":        "F8",
        "consola.shortcut_copy_label":  "copy",
        "consola.shortcut_clear":       "F9",
        "consola.shortcut_clear_label": "clear",

        "explorer.title_short":         "explorer",
        "explorer.back":                "← back",
        "explorer.search_placeholder":  "block · hash · txid · address",
        "explorer.placeholder_title":   "BCH block explorer",
        "explorer.placeholder_sub":     "block · transaction · address",
        "explorer.loading":             "querying network…",
        "explorer.cmd_error":           "error",
        "explorer.no_result":           "no result",
        "explorer.tag_block":           "⧫ BLOCK",
        "explorer.tag_address":         "◈ ADDRESS",
        "explorer.tag_not_found":       "✕",
        "explorer.label_hash":          "hash",
        "explorer.label_date":          "date",
        "explorer.label_difficulty":    "difficulty",
        "explorer.label_size":          "size",
        "explorer.label_previous":      "previous",
        "explorer.label_next":          "next",
        "explorer.label_transactions":  "transactions",
        "explorer.label_outputs":       "outputs",
        "explorer.label_inputs":        "inputs",
        "explorer.label_txid":          "TXID",
        "explorer.label_block":         "block",
        "explorer.label_confirmations": "confirmations",
        "explorer.label_version":       "version",
        "explorer.label_type":          "type",
        "explorer.label_unconfirmed":   "unconfirmed",
        "explorer.label_fee":           "■ FEE",
        "explorer.label_total_in":      "total in",
        "explorer.label_total_out":     "total out",
        "explorer.label_summary":       "SUMMARY",
        "explorer.label_inputs_short":  "inputs",
        "explorer.label_outputs_short": "outputs",
        "explorer.label_address":       "Address",
        "explorer.label_validate":      "Validate",
        "explorer.label_block_prefix":  "Block",
        "explorer.section_inputs":      "▶ INPUTS",
        "explorer.section_outputs":     "◀ OUTPUTS",
        "explorer.tx_type_coinbase":    "⛏ COINBASE",
        "explorer.tx_type_transparent": "▸ transparent",
        "explorer.tx_type_unknown":     "▸ unknown",
        "explorer.tx_type_coinbase_short":"Coinbase",
        "explorer.tx_type_transparent_short":"Transparent",
        "explorer.tag_coinbase":        "COINBASE",
        "explorer.tag_input":           "input",
        "explorer.tag_op_return":       "OP_RETURN/other",
        "explorer.copy_result":         "[ copy ]",
        "explorer.ok_validate":         "yes",
        "explorer.error_validate":      "no",
        "explorer.is_valid":            "valid",
        "explorer.is_mine":             "belongs to wallet",
        "explorer.no_hash_found":       "No block or transaction found with that hash",
        "explorer.shortcut_copy":       "F8",
        "explorer.shortcut_copy_label": "copy",
        "explorer.shortcut_clear":      "F9",
        "explorer.shortcut_clear_label":"clear",

        "nodo.title_short":             "monitor",
        "nodo.panel_title":             "BCH NODE MONITOR",
        "nodo.card.node_state":         "Node · Status",
        "nodo.card.network":            "Node · Network",
        "nodo.card.market":             "BCH · Market",
        "nodo.card.cert":               "SSL Certificate",
        "nodo.cert.issuer":             "ISSUER",
        "nodo.cert.subject":            "DOMAIN",
        "nodo.cert.valid_from":         "VALID FROM",
        "nodo.cert.valid_to":           "VALID TO",
        "nodo.cert.days":               "DAYS REMAINING",
        "nodo.label.24h":               "24h %",
        "nodo.label.7d":                "7d %",
        "nodo.label.vol_24h":           "24h VOLUME",
        "nodo.note_default":            "This BCH node is syncing the blockchain. Data refreshes every 5 minutes.",
        "nodo.note_syncing":            "Node is syncing the blockchain. Blocks behind:",
        "nodo.note_ok":                 "Node is fully synced. Data refreshes every 5 minutes.",
        "nodo.footer.colabora":         "[CONTRIBUTE]",
        "nodo.colabora.title":          "CONTRIBUTE TO THE NODE",
        "nodo.colabora.desc":           "If you want to support the maintenance of this node and services, you can send BCH to any of these addresses:",
        "nodo.colabora.copy":           "Copy",
        "nodo.colabora.copied":         "Copied!",
        "nodo.colabora.thanks":         "Thanks for your support! ❤️"
    }
};

const BchI18n = (function() {
    let currentLang = 'es';

    function detectLang() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && TRANSLATIONS[urlLang]) return urlLang;

        const saved = localStorage.getItem('bch_lang');
        if (saved && TRANSLATIONS[saved]) return saved;

        const nav = (navigator.language || 'es').substring(0, 2).toLowerCase();
        if (TRANSLATIONS[nav]) return nav;

        return 'es';
    }

    function t(key) {
        return TRANSLATIONS[currentLang]?.[key]
            ?? TRANSLATIONS['es']?.[key]
            ?? key;
    }

    function apply() {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = 'ltr';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = t(key);
            if (val) el.textContent = val;
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = t(key);
            if (val) el.setAttribute('placeholder', val);
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const val = t(key);
            if (val) el.setAttribute('title', val);
        });

        document.querySelectorAll('.lang-switcher button').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });

        if (typeof window.onLangChange === 'function') {
            window.onLangChange();
        }
    }

    function setLang(lang) {
        if (!TRANSLATIONS[lang]) return;
        currentLang = lang;
        localStorage.setItem('bch_lang', lang);
        apply();
    }

    function init() {
        currentLang = detectLang();

        document.querySelectorAll('.lang-switcher button').forEach(btn => {
            btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
        });

        apply();
    }

    return {
        init,
        t,
        setLang,
        getLang: () => currentLang,
        apply
    };
})();

window.FiroI18n = BchI18n;
