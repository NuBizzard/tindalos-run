# Tindalos Run

Juego de navegador estilo escape-room + aventura conversacional.

## Cómo jugar
- Abrí `index.html` en tu navegador (Chrome/Firefox).
- Usá los botones para moverte entre habitaciones (norte, sur, este, oeste).
- Hacé clic en "Tomar objeto" para agregar items a tu inventario.
- Leé la descripción de cada habitación para pistas.

## Estructura del proyecto
- `index.html` – Página principal
- `css/style.css` – Estilos básicos
- `js/engine/` – Motor del juego (Room, Inventory, Dialog)
- `js/data/rooms.js` – Definición de mapa y objetos
- `js/game.js` – Loop principal y lógica de interacción
- `assets/` – Sprites, sonidos (pendientes)

## Desarrollo
Todo es vanilla JS/modular. Para extender:
- Agregá nuevas habitaciones en `rooms.js`.
- Creá puzzles en `game.js` o en el módulo que corresponda.
- Añadí assets en `assets/` y referenciálos en Room.render().
