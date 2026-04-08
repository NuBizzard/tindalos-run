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
    container.innerHTML = this.items.length
      ? `Inventario: ${this.items.join(', ')}`
      : 'Inventario vacío';
  }
}
