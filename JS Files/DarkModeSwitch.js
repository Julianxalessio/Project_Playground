let darkmodeZähler;
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

    checkbox.addEventListener('change', function() {
        if (this.checked) {
          document.body.classList.add('dark-mode');
          darkmodeZähler = True;
        } else {
          document.body.classList.remove('dark-mode');
          darkmodeZähler = false;
        }
      });
    

});