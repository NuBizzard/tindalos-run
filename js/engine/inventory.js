class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  has(item) {
    return this.items.includes(item);
  }

  remove(item) {
    const idx = this.items.indexOf(item);
    if (idx >= 0) this.items.splice(idx, 1);
  }

  render(container) {
    const icons = {
      'llave oxidada': '🔑',
      'anillo brillante': '💍',
      'antorcha': '🔦',
      'piedra con inscripción': '🗿',
      'Palo seco': '🪵',
      'pista': '📜'
    };
    const itemsHtml = this.items.length
      ? this.items.map(i => `${icons[i] || '📦'} <b>${i}</b>`).join(' ')
      : '<i>Inventario vacío</i>';
    container.innerHTML = `<strong>Inventario:</strong> ${itemsHtml}`;
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '6px';
  }
}
