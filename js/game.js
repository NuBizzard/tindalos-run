const roomDiv = document.getElementById('room');
const logDiv = document.getElementById('log');
const inventory = new Inventory();
const dialog = new Dialog();
let currentRoomId = 'start';
let gameEnded = false;
const gameState = { movedTronco: false };

let currentNPC = null;
let convIndex = 0;

function log(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}

function go(direction) {
  if (gameEnded || currentNPC) return;
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
  if (gameEnded || currentNPC) return;
  const room = ROOMS[currentRoomId];
  const idx = room.items.indexOf(itemName);
  if (idx < 0) return;
  room.items.splice(idx, 1);
  inventory.add(itemName);
  log(` Tomaste: ${itemName}`);
  renderRoom();
}

function startConversation(npc) {
  if (!npc.lines || npc.lines.length === 0) return;
  currentNPC = npc;
  convIndex = 0;
  renderRoom(); // para actualizar botones (ocultar acciones)
  renderConversation();
}

function advanceConversation() {
  convIndex++;
  renderConversation();
}

function endConversation() {
  if (currentNPC && currentNPC.onComplete) {
    currentNPC.onComplete({ inventory, gameState, log, go });
  }
  currentNPC = null;
  convIndex = 0;
  renderRoom();
}

function renderConversation() {
  const npc = currentNPC;
  if (!npc) return;
  const line = npc.lines[convIndex];
  const isLast = convIndex >= npc.lines.length - 1;
  dialog.show(
    line,
    isLast ? [{ text: 'Terminar' }] : [{ text: 'Continúa' }],
    () => isLast ? endConversation() : advanceConversation()
  );
}

function finish(ending) {
  gameEnded = true;
  const asciiContainer = document.getElementById('room-ascii');
  const contentContainer = document.getElementById('room-content');
  asciiContainer.style.display = 'none';
  let mensaje = '';
  switch(ending) {
    case 'Escape':
      mensaje = '¡Escapaste! La llave abre el cofre, revelando un pasadizo que conduce a la superficie. Los ecos de los perros se desvanecen. Has sobrevivido a Tindalos.';
      break;
    case 'Maldición':
      mensaje = 'El anillo brilla con luz antinatural. De las paredes emergen sombras con forma de perro. Sientes cómo el tiempo se detiene. Eres consumido por los Perros de Tindalos.';
      break;
    case 'MaldiciónCofre':
      mensaje = 'Al usar la llave, el anillo brilla cegador. El cofre se abre a un vacío distorsionado. Un Perro de Tindalos emerge y te arrastra a su dimensión. El tiempo se dobla y desapareces.';
      break;
    case 'Ritual':
      mensaje = 'Colocas la antorcha en el altar según las runas. El suelo se abre en un vortex de luz. Cruzas a otro lugar, lejos de Tindalos. Has completado el ritual de los sabios.';
      break;
    default:
      mensaje = 'Fin del juego.';
  }
  contentContainer.innerHTML = `<h1>Fin</h1><p>${mensaje}</p>`;
}

function renderRoom() {
  if (gameEnded) return;
  const room = ROOMS[currentRoomId];
  const asciiContainer = document.getElementById('room-ascii');
  const contentContainer = document.getElementById('room-content');
  room.render(asciiContainer, contentContainer);
  inventory.render(document.getElementById('inventory'));

  const actionsDiv = document.createElement('div');
  actionsDiv.style.marginTop = '12px';
  actionsDiv.id = 'action-buttons';

  if (currentNPC) {
    const btn = document.createElement('button');
    btn.textContent = 'Continuar conversación';
    btn.onclick = () => advanceConversation();
    actionsDiv.appendChild(btn);
  } else {
    const dirNames = { north: 'Norte', south: 'Sur', east: 'Este', west: 'Oeste', down: 'Abajo' };
    Object.entries(room.exits).forEach(([dir, dest]) => {
      const btn = document.createElement('button');
      btn.textContent = `Ir ${dirNames[dir] || dir}`;
      btn.onclick = () => go(dir);
      actionsDiv.appendChild(btn);
    });

    room.items.forEach(item => {
      const btn = document.createElement('button');
      btn.textContent = `Agarrar ${item}`;
      btn.style.marginLeft = '8px';
      btn.onclick = () => take(item);
      actionsDiv.appendChild(btn);
    });

    room.npcs.forEach(npc => {
      const btn = document.createElement('button');
      btn.textContent = `Hablar con ${npc.name}`;
      btn.style.marginLeft = '8px';
      btn.onclick = () => startConversation(npc);
      actionsDiv.appendChild(btn);
    });

    // Special room actions
    if (room.id === 'outside' && !inventory.has('pista')) {
      const btn = document.createElement('button');
      btn.textContent = 'Examinar piedra';
      btn.style.marginLeft = '12px';
      btn.onclick = () => {
        inventory.add('pista');
        log('Has leído la inscripción: "La llama que guía desbloquea el camino entre los perros."');
        renderRoom();
      };
      actionsDiv.appendChild(btn);
    }

    if (room.id === 'clearing') {
      if (inventory.has('Palo seco') && !gameState.movedTronco) {
        const btn = document.createElement('button');
        btn.textContent = 'Mover tronco con Palo seco';
        btn.style.marginLeft = '12px';
        btn.onclick = () => {
          gameState.movedTronco = true;
          ROOMS['clearing'].exits.down = 'chamber';
          log('Mueves el tronco y descubres un pasadizo hacia abajo.');
          renderRoom();
        };
        actionsDiv.appendChild(btn);
      }
    }

    if (room.id === 'chamber') {
      if (inventory.has('llave oxidada')) {
        const btn = document.createElement('button');
        btn.textContent = inventory.has('anillo brillante')
          ? 'Abrir cofre (¡el anillo brilla!)'
          : 'Abrir cofre con llave';
        btn.style.marginLeft = '12px';
        btn.onclick = () => {
          if (inventory.has('anillo brillante')) {
            finish('MaldiciónCofre');
          } else {
            finish('Escape');
          }
        };
        actionsDiv.appendChild(btn);
      }
      if (inventory.has('anillo brillante')) {
        const btn = document.createElement('button');
        btn.textContent = 'Mirar el anillo';
        btn.style.marginLeft = '12px';
        btn.onclick = () => finish('Maldición');
        actionsDiv.appendChild(btn);
      }
      if (inventory.has('antorcha') && inventory.has('pista')) {
        const btn = document.createElement('button');
        btn.textContent = 'Colocar antorcha en altar según inscripción';
        btn.style.marginLeft = '12px';
        btn.onclick = () => finish('Ritual');
        actionsDiv.appendChild(btn);
      }
    }
  }

  contentContainer.appendChild(actionsDiv);
}

// Inicio
renderRoom();
log('>> Juego iniciado. Usa los botones para moverte, tomar objetos o interactuar.');
