class Room {
  constructor(id, name, description, exits = {}, items = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.exits = exits; // { north: 'roomId', ... }
    this.items = items; // Array de objetos visibles
  }

  render(container) {
    container.innerHTML = `
      <h2>${this.name}</h2>
      <p>${this.description}</p>
      ${this.items.length ? `<p>Ves: ${this.items.map(i => `<strong>${i}</strong>`).join(', ')}</p>` : ''}
    `;
  }
}
