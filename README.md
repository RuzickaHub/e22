# Portfolio Web - Jakub Růžička

Moderní, responzivní portfolio webové stránky pro grafického designéra a webového vývojáře.

## 🚀 Demo

[Živá ukázka](https://ruzickahub.github.io/e22/)

## ✨ Funkce

- **Moderní Design** - Gradient barvy a glassmorphism efekty
- **Plně Responzivní** - Optimalizováno pro všechna zařízení
- **Portfolio Filtrování** - Dynamické filtrování projektů
- **Animace** - Smooth scroll a intersection observer animace
- **Kontaktní Formulář** - S validací a notifikacemi
- **Jazykový Přepínač** - CZ/EN podpora
- **PWA Ready** - Service Worker pro offline funkčnost
- **SEO Optimalizováno** - Sémantické HTML a meta tagy

## 📁 Struktura Projektu

```
e22/
├── index.html              # Hlavní HTML soubor
├── style.css               # Hlavní CSS styly
├── manifest.json           # PWA manifest
├── favicon.svg             # Favicon
├── service-worker.js       # Service Worker pro PWA
├── scripts/
│   └── app.js             # Hlavní JavaScript
├── icons/
│   ├── icon-192.png       # PWA ikona 192x192
│   └── icon-512.png       # PWA ikona 512x512
└── README.md              # Dokumentace
```

## 🛠️ Technologie

- **HTML5** - Sémantické značkování
- **CSS3** - Moderní styly s CSS Variables
- **JavaScript (ES6+)** - Vanilla JS bez závislostí
- **Service Worker** - Pro PWA funkčnost
- **Web Fonts** - Inter & Manrope z Google Fonts

## 📦 Instalace

1. **Klonujte repozitář:**
```bash
git clone https://github.com/RuzickaHub/e22.git
cd e22
```

2. **Otevřete v prohlížeči:**
```bash
# Použijte live server nebo otevřete přímo
open index.html
```

## 🎨 Customizace

### Změna Barev

Upravte CSS proměnné v `style.css`:

```css
:root {
    --primary-color: #667eea;      /* Hlavní barva */
    --secondary-color: #764ba2;     /* Sekundární barva */
    --accent-color: #f093fb;        /* Akcentová barva */
}
```

### Osobní Údaje

Upravte v `index.html`:
- Email: `mail@ruzickajakub.cz`
- Telefon: `+420 XXX XXX XXX`
- Sociální sítě odkazy

### Obrázky Projektů

Nahraďte URL obrázků v portfolio sekci:
```html
<img src="VAŠE_URL_OBRÁZKU" alt="Popis projektu">
```

## 📱 Responzivní Breakpointy

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚀 Nasazení

### GitHub Pages

1. Nahrajte soubory na GitHub
2. Jděte do Settings → Pages
3. Vyberte branch `main` a složku `/ (root)`
4. Uložte a počkejte na nasazení

### Netlify

```bash
# Drag & drop složku na netlify.com
# nebo použijte Netlify CLI
netlify deploy --prod
```

### Vercel

```bash
vercel --prod
```

## 📊 Výkon

- ⚡ **Lighthouse Score:** 95+
- 🎯 **First Contentful Paint:** < 1.5s
- 📦 **Total Size:** ~ 50KB (bez obrázků)
- 🔄 **Service Worker:** Offline podpora

## 🧩 Sekce

1. **Hero** - Úvodní sekce s hlavním call-to-action
2. **Služby** - 9 hlavních služeb v mřížce
3. **Portfolio** - Projekty s filtrováním
4. **O mně** - Informace, skill bary, CV download
5. **Proces** - 4-krokový workflow
6. **Kontakt** - Formulář a kontaktní informace
7. **Footer** - Rychlé odkazy a sociální sítě

## 🎯 Funkce JavaScript

- Mobile menu (hamburger)
- Smooth scrolling
- Portfolio filtrování
- Formulář validace
- Scroll to top button
- Skill bars animace
- Intersection Observer
- Notification systém

## 🔧 Konfigurace Service Worker

Upravte cache v `service-worker.js`:

```javascript
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/scripts/app.js'
];
```

## 📝 TODO

- [ ] Přidat blog sekce
- [ ] Implementovat skutečné API pro formulář
- [ ] Přidat dark mode
- [ ] Implementovat více jazykových mutací
- [ ] Přidat Case Studies detailní stránky
- [ ] Implementovat Testimonials sekci

## 🤝 Přispívání

Pull requesty jsou vítány! Pro větší změny prosím nejprve otevřete issue.

## 📄 Licence

MIT License - použijte volně pro osobní i komerční projekty.

## 👤 Autor

**Jakub Růžička**
- Email: mail@ruzickajakub.cz
- GitHub: [@RuzickaHub](https://github.com/RuzickaHub)

## 🙏 Poděkování

- Design inspirace: Awwwards, Dribbble
- Fonty: Google Fonts (Inter, Manrope)
- Ikony: Unicode Emoji

---

Vytvořeno s ❤️ v roce 2025
