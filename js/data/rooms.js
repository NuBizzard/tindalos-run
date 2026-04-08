const ROOMS = {
  start: new Room('start', 'Cabaña abandonada', 'Estás en una cabaña de madera podrida. Hay una puerta al norte y una ventana rota al este.', {
    north: 'clearing',
    east: 'outside'
  }, ['llave oxidada']),
  clearing: new Room('clearing', 'Clarera', 'Un claro en el bosque. Árboles altos te rodean. El camino sigue al norte.', {
    north: 'deep-forest',
    south: 'start'
  }, []),
  outside: new Room('outside', 'Exterior de la cabaña', 'Afuera,hay maleza alta. Un sendero se pierde al este.', {
    west: 'start',
    east: 'path'
  }, []),
  'deep-forest': new Room('deep-forest', 'Bosque profundo', 'La luz se filtra entre las ramas. Ves algo brillar entre las raíces.', {
    south: 'clearing'
  }, ['anillo brillante']),
  path: new Room('path', 'Sendero', 'Un camino de tierra entre arbustos. Continúa al este.', {
    east: 'ruins',
    west: 'outside'
  }, []),
  ruins: new Room('ruins', 'Ruinas antiguas', 'Piedras cubiertas de musgo. Una puerta de piedra al norte parece entreabierta.', {
    north: 'chamber',
    west: 'path'
  }, ['piedra con inscripción']),
  chamber: new Room('chamber', 'Cámara secreta', 'Una habitación circular con símbolos en el suelo. El aire es helado.', {
    south: 'ruins'
  }, ['antorcha']),
};
