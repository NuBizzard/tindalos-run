class Room {
  constructor(id, name, description, exits = {}, items = [], npcs = [], ascii = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.exits = exits;
    this.items = items;
    this.npcs = npcs;
    this.ascii = ascii;
  }

  render(asciiContainer, contentContainer) {
    if (this.ascii) {
      asciiContainer.textContent = this.ascii;
      asciiContainer.style.display = 'block';
    } else {
      asciiContainer.style.display = 'none';
    }
    contentContainer.innerHTML = `
      <h2>${this.name}</h2>
      <p>${this.description}</p>
      ${this.items.length ? `<p>Ves: ${this.items.map(i => `<strong>${i}</strong>`).join(', ')}</p>` : ''}
    `;
  }
}
