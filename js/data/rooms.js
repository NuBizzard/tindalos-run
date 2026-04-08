const ROOMS = {
  start: new Room('start', 'Cabaña abandonada', 'Una cabaña de madera podrida. Hay una puerta al norte y una ventana rota al este. Huele a humedad.', {
    north: 'clearing',
    east: 'outside'
  }, ['llave oxidada'], [{
    id: 'ghost',
    name: 'Figura fantasmal',
    lines: [
      "No deberías estar aquí...",
      "Este lugar está maldito por los Perros de Tindalos.",
      "Busca la llave oxidada en la cabaña y el anillo brillante en el bosque.",
      "Si abres el cofre con la llave y el anillo, desatarás una maldición.",
      "Pero si colocas la antorcha en el altar según las runas, podrás escapar."
    ]
  }], `
  ┌─────────────────────────────┐
  │                             │
  │  ┌───┐                 ┌───┐│
  │  │   │  Ventanas        │   ││
  │  └───┘  rotas           │ P ││ ← puerta
  │        ───┐              │   ││    norte
  │            │              └───┘│
  └────────────┼───────────────┘
               │
`),
  clearing: new Room('clearing', 'Clarera', 'Un claro en el bosque. Árboles altos te rodean. El camino sigue al norte. Hay un viejo tronco caído.', {
    north: 'deep-forest',
    south: 'start'
  }, ['Palo seco'], [{
    id: 'hermit',
    name: 'Ermitaño',
    lines: [
      "Hola, caminante.",
      "Los Perros de Tindalos acechan en las sombras.",
      "Busca el Palo seco para mover obstáculos.",
      "La antorcha en la cámara secreta es tu salvación si la usas con sabiduría."
    ],
    onComplete: (helpers) => {
      if (!helpers.inventory.has('pista')) {
        helpers.inventory.add('pista');
        helpers.log('El ermitaño te entrega un pergamino con una antigua inscripción.');
      }
    }
  }], `
       ▲
      ╱ ╲
     ╱   ╲  Árboles
    ╱  o  ╲
   ╱       ╲
  ╱─────────╲
      │ │
      │ │    Tronco
     ─┼─┼─
`),
  outside: new Room('outside', 'Exterior de la cabaña', 'Afuera, la maleza alta cierra el paso. Un sendero se pierde al este. Hay una piedra con algo escrito.', {
    west: 'start',
    east: 'path'
  }, ['piedra con inscripción'], [], `
      ╭───╮   ╭───╮
     ╱     ╲ ╱     ╲
    ╱       ╲╱       ╲   Cabaña
    │       ||       │
    │       ||       │
    ╲       ╱╲       ╱
     ╲     ╱   ╲   ╱
      ╰───╯     ╰───╯
           ║ ║
           ║ ║   Sendero
          ═══
`),
  'deep-forest': new Room('deep-forest', 'Bosque profundo', 'La luz se filtra entre las ramas. Ves algo brillar entre las raíces de un viejo roble.', {
    south: 'clearing'
  }, ['anillo brillante'], [], `
       ▲   ▲
      ╱ ╲ ╱ ╲
     ╱   ╲   ╲
    ╱─────╲─────╲
    │─────│─────│
    │     │     │
    │  ───┼───  │  Roble
    │     │     │
    ╲─────╱─────╲
         ║    (o) Brillo
`),
  path: new Room('path', 'Sendero', 'Un camino de tierra entre arbustos. Continúa al este. Un cuervo vigila desde una roca.', {
    east: 'ruins',
    west: 'outside'
  }, [], [{
    id: 'traveler',
    name: 'Viajero errante',
    lines: [
      "¿Eh? ¿Eres tú el que se adentra en las ruinas?",
      "Allí hay un cofre, pero cuidado con el anillo...",
      "Dicen que la luz de la antorcha puede guiarte."
    ]
  }], `
   ╔══════════════════════════╗
   ║                          ║
   ║   =================      ║
   ║                          ║
   ╚══════════════════════════╝
         ║   ║
         ║   ║
        (> )O   Cuervo
`),
  ruins: new Room('ruins', 'Ruinas antiguas', 'Piedras cubiertas de musgo. Una puerta de piedra al norte parece entreabierta. Hay dibujos extraños en las paredes.', {
    north: 'chamber',
    west: 'path'
  }, ['piedra con inscripción'], [{
    id: 'guardian',
    name: 'Guardian de piedra',
    lines: [
      "No措... (no puedo detenerte)",
      "El cofre en la cámara contiene el destino.",
      "Solo los sabios usan la llama como guía."
    ]
  }], `
       ┌──────────────────┐
      ╱                  ╲
     ╱    [========]      ╲   Arco
    ╱    ╱        ╲       ╲
   ╱    ╱──────────╲       ╲
   ╲    ╱            ╲      ╱
    ╲  ╱              ╲    ╱
     ╰─╯               ╰──╯
`),
  chamber: new Room('chamber', 'Cámara secreta', 'Una habitación circular con símbolos en el suelo. El aire es helado. Una antorcha brilla débilmente.', {
    south: 'ruins'
  }, ['antorcha'], [{
    id: 'voice',
    name: 'Voz ancestral',
    lines: [
      "Has llegado, pequeño mortal.",
      "Los Perros de Tindalos devoran el tiempo.",
      "Tu elección aquí decidirá tu eternidad."
    ]
  }], `
        ┌─┐
       ╱   ╲
      ╱  (+) ╲   Símbolos
     ╱   ──   ╲
     ╲────────╱
      ╲──────╱
       ╲    ╱
        ╰──╯
         ││
         ││   Altar
         └┘
`),
};
