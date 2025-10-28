# Přispívání do Projektu

Děkujeme za váš zájem přispět do tohoto projektu! Zde jsou některé pokyny, jak přispět.

## 🚀 Jak začít

1. **Fork repozitář**
2. **Klonujte váš fork:**
```bash
git clone https://github.com/your-username/e22.git
cd e22
```

3. **Vytvořte novou větev:**
```bash
git checkout -b feature/nova-funkce
```

## 📝 Pravidla pro Pull Requests

### Před odesláním PR:

- ✅ Otestujte změny v různých prohlížečích (Chrome, Firefox, Safari, Edge)
- ✅ Otestujte responzivitu (mobile, tablet, desktop)
- ✅ Zkontrolujte konzoli na errory
- ✅ Ověřte, že vše funguje i offline (Service Worker)
- ✅ Zkontrolujte, že code splňuje style guide

### Commit zprávy:

Používejte výstižné commit zprávy:

```
feat: přidání nové funkce X
fix: oprava bugu v Y
docs: aktualizace dokumentace
style: formátování kódu
refactor: refaktoring komponenty Z
perf: optimalizace výkonu
test: přidání testů
chore: aktualizace závislostí
```

### Struktura PR:

```markdown
## Popis změn
Jasný popis co bylo změněno a proč.

## Typ změny
- [ ] Bug fix
- [ ] Nová funkce
- [ ] Breaking change
- [ ] Dokumentace

## Testování
Popište jak jste změny otestovali.

## Screenshots
Přidejte screenshoty pokud jsou relevantní.

## Checklist
- [ ] Kód splňuje style guide
- [ ] Testováno v různých prohlížečích
- [ ] Responzivní design funguje
- [ ] Dokumentace aktualizována
```

## 🎨 Style Guide

### HTML
- Používejte sémantické HTML5 tagy
- Správná indentace (2 mezery)
- Alt texty pro obrázky
- ARIA labels pro přístupnost

### CSS
- CSS proměnné pro barvy a hodnoty
- BEM naming convention tam kde je to vhodné
- Mobile-first přístup
- Komentáře pro složitější části

### JavaScript
- ES6+ syntax
- Používejte `const` a `let`, ne `var`
- Arrow functions kde je to vhodné
- Komentáře pro funkce
- Async/await pro asynchronní kód

## 🐛 Hlášení Bugů

Vytvořte issue s těmito informacemi:

```markdown
## Popis Problému
Jasný popis co se děje.

## Kroky k Reprodukci
1. Jděte na '...'
2. Klikněte na '...'
3. Vizte error

## Očekávané Chování
Co by se mělo stát.

## Screenshots
Pokud je to relevantní.

## Prostředí
- OS: [např. Windows 10]
- Prohlížeč: [např. Chrome 120]
- Rozlišení: [např. 1920x1080]
```

## 💡 Návrhy na Funkce

Vytvořte issue s:

```markdown
## Popis Funkce
Jasný popis nové funkce.

## Proč je to potřeba?
Vysvětlete use case.

## Návrh Implementace
Jak by to mohlo být implementováno.

## Alternativy
Jaké jsou alternativy?
```

## 📚 Oblasti k Přispění

### Prioritní:
- 🌐 Implementace více jazyků (EN, DE, atd.)
- 🎨 Dark mode
- 📝 Blog sekce
- 📊 Case studies stránky
- ⭐ Testimonials sekce
- 📱 Lepší PWA integrace

### Vítány jsou také:
- 🐛 Bug fixy
- 📖 Dokumentace
- ♿ Zlepšení přístupnosti
- ⚡ Optimalizace výkonu
- 🎨 UI/UX vylepšení

## 🔍 Code Review Process

1. **Automatické kontroly** - GitHub Actions
2. **Peer review** - Alespoň 1 schválení
3. **Testing** - Manuální testování změn
4. **Merge** - Squash and merge do main

## 📞 Kontakt

- **Email:** mail@ruzickajakub.cz
- **GitHub Issues:** Preferovaný způsob komunikace
- **Pull Requests:** Pro diskuzi o změnách

## 📄 Licence

Přispíváním do tohoto projektu souhlasíte s tím, že váš kód bude licencován pod MIT licencí.

---

Děkujeme za váš čas a příspěvek! 🙏
