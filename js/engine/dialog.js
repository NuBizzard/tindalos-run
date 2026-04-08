class Dialog {
  constructor() {
    this.choices = [];
  }

  show(text, choices = [], onSelect) {
    const container = document.getElementById('dialog');
    container.innerHTML = `<p>${text}</p>`;
    const ul = document.createElement('ul');
    choices.forEach((c, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" data-index="${i}">${c.text}</a>`;
      li.querySelector('a').onclick = (e) => {
        e.preventDefault();
        onSelect(i);
      };
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  clear() {
    const container = document.getElementById('dialog');
    container.innerHTML = '';
  }
}
