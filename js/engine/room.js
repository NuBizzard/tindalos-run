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

  render(contentContainer) {
    contentContainer.innerHTML = `
      <h2>${this.name}</h2>
      <p>${this.description}</p>
      ${this.items.length ? `<p>Ves: ${this.items.map(i => `<strong>${i}</strong>`).join(', ')}</p>` : ''}
    `;
  }

  draw(canvas) {
    if (!this.ascii) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px "Courier New", monospace';
    ctx.fillStyle = '#8af';
    ctx.textBaseline = 'top';
    const lines = this.ascii.trim().split('\n');
    const lineHeight = 14;
    lines.forEach((line, i) => {
      ctx.fillText(line, 10, i * lineHeight + 8);
    });
  }
}
