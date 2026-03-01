# Sprint 6 – Documentatie & Reflectie
## Responsive ontwerpkeuzes

Voor deze sprint heb ik mijn website volledig responsive gemaakt met een mobile first aanpak.

### Keuzes:
- Mobile first CSS: Eerst gestyled voor kleine schermen, daarna uitgebreid met media queries.
- Flexbox & Grid: Flexbox voor kleinere components en grid voor grotere layouts.

### Breakpoints:
- min-width: 320px: telefoon
- min-width: 1024px: desktop

clamp() gebruikt voor responsive text

## Toegankelijkheid (Accessibility)
Ik heb rekening gehouden met toegankelijkheid volgens de richtlijnen van WCAG.

### Toegepaste verbeteringen:
- Semantische HTML (<header>, <main>, <hgroup>, <footer>)
- Correct gebruik van aria-label waar nodig
- Goede kleurcontrast (getest met contrast checker)
- Focus states zichtbaar gemaakt voor tab navigatie
- Alt teksten toegevoegd aan images
- Geen div's gebruikt

#### Waarom dit belangrijk is:
- Website is bruikbaar met keyboard
- Screenreaders kunnen beter door de content heen
