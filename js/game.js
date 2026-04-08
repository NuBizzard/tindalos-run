const roomDiv = document.getElementById('room');
const logDiv = document.getElementById('log');
const inventory = new Inventory();
const dialog = new Dialog();
let currentRoomId = 'start';

function log(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}

function go(direction) {
  const room = ROOMS[currentRoomId];
  const nextId = room.exits[direction];
  if (!nextId) {
    log('No puedes ir en esa dirección.');
    return;
  }
  currentRoomId = nextId;
  renderRoom();
}

function take(itemName) {
  const room = ROOMS[currentRoomId];
  const idx = room.items.indexOf(itemName);
  if (idx < 0) return;
  room.items.splice(idx, 1);
  inventory.add(itemName);
  log(` Tomaste: ${itemName}`);
  renderRoom();
}

function renderRoom() {
  const room = ROOMS[currentRoomId];
  room.render(roomDiv);
  inventory.render(document.getElementById('inventory'));
  // Log simple de movimiento
  // log(`Estás en: ${room.name}`);
  // Exits como clickeables
  const exitsDiv = document.createElement('div');
  exitsDiv.style.marginTop = '12px';
  Object.entries(room.exits).forEach(([dir, dest]) => {
    const btn = document.createElement('button');
    btn.textContent = `Ir ${dir}`;
    btn.onclick = () => go(dir);
    exitsDiv.appendChild(btn);
  });
  roomDiv.appendChild(exitsDiv);
  // Items tomables
  room.items.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = `Tomar ${item}`;
    btn.style.marginLeft = '8px';
    btn.onclick = () => take(item);
    exitsDiv.appendChild(btn);
  });
}

// Inicio
renderRoom();
log('>> Juego iniciado. Usa los botones para moverte o tomar objetos.');
