(function (global) {
    const SUPPORTED = ['es', 'en', 'ar'];
    const DEFAULT_LANG = 'es';

    const _scriptEl = document.currentScript;
    const _scriptUrl = _scriptEl
        ? new URL(_scriptEl.src, window.location.href)
        : new URL('/pagina/js/i18n.js', window.location.origin);
    const BASE_PATH = _scriptUrl.pathname.replace(/\/js\/i18n\.js$/, '');
    const LOCALES_PATH = BASE_PATH + '/locales';

    let currentLang = DEFAULT_LANG;
    let translations = {};

    function t(key) {
        if (!(key in translations)) {
            console.warn('[i18n] falta:', key, '·', currentLang);
            return key;
        }
        return translations[key];
    }

    async function loadLocale(lang) {
        const r = await fetch(`${LOCALES_PATH}/${lang}.json`);
        if (!r.ok) throw new Error(`Locale ${lang} no disponible`);
        translations = await r.json();
    }

    function applyStaticTranslations(root) {
        (root || document).querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        (root || document).querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
        });
        (root || document).querySelectorAll('[data-i18n-title]').forEach(el => {
            el.setAttribute('title', t(el.dataset.i18nTitle));
        });
    }

    async function setLang(lang, persist) {
        if (persist === undefined) persist = true;
        if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
        currentLang = lang;
        if (persist) localStorage.setItem('firo_lang', lang);

        try {
            await loadLocale(lang);
        } catch (e) {
            console.warn(e);
            if (lang !== DEFAULT_LANG) return setLang(DEFAULT_LANG, false);
            return;
        }

        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        applyStaticTranslations();

        if (typeof global.onLangChange === 'function') global.onLangChange();

        document.querySelectorAll('.lang-switcher button').forEach(b =>
            b.classList.toggle('active', b.dataset.lang === lang)
        );
    }

    function getLang() { return currentLang; }

    function bindSwitcher() {
        document.querySelectorAll('.lang-switcher button').forEach(btn => {
            btn.addEventListener('click', () => setLang(btn.dataset.lang));
        });
    }

    async function init() {
        const stored = localStorage.getItem('firo_lang');
        const browser = (navigator.language || 'es').slice(0, 2);
        const initial = stored || (SUPPORTED.includes(browser) ? browser : DEFAULT_LANG);
        await setLang(initial, false);
        bindSwitcher();
    }

    global.FiroI18n = { t, setLang, getLang, init, applyStaticTranslations };
})(window);