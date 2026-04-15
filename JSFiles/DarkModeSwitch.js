let darkmodeZähler = false; // Initialisierung der Variable

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const label = document.createElement('label');
  label.classList.add('switch');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'darkModeToggle';

  const slider = document.createElement('span');
  slider.classList.add('slider');

  label.appendChild(checkbox);
  label.appendChild(slider);

  container.appendChild(label);

  document.body.appendChild(container);

  // Event-Listener für den Toggle-Schalter
  checkbox.addEventListener('change', function () {
    const inputs = document.querySelectorAll('input[type="text"]'); // Alle Texteingaben
    if (this.checked) {
      document.body.classList.add('dark-mode');
      inputs.forEach(input => {
        input.style.borderColor = 'white'; // Randfarbe ändern
      });
      darkmodeZähler = true;
    } else {
      document.body.classList.remove('dark-mode');
      inputs.forEach(input => {
        input.style.borderColor = ''; // Standard-Rand wiederherstellen
      });
      darkmodeZähler = false;
    }
  });
});