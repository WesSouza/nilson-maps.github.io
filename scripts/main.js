/* -- UTILS ----------------------------------------------------------------- */
const forEach = (el, fn) => {
  Array.prototype.forEach.call(el, fn);
}

/* -- NilsonPlayer ---------------------------------------------------------- */
class NilsonPlayer {
  constructor() {
    this.soundsPath = './audio/';
    this.sounds = {};

    if (typeof Audio === 'undefined') {
      throw new Error('No Audio support.');
    }
  }

  load(name) {
    const audio = new Audio(`${this.soundsPath}/${name}.mp3`);
    this.sounds[name] = audio;
  }

  play(name) {
    this.sounds[name].currentTime = 0;
    return this.sounds[name].play();
  }
}

/* -- NilsonMaps ------------------------------------------------------------ */
class NilsonMaps {
  constructor(el) {
    this.el = el;
    this.pin = el.querySelector('[data-pin]');

    this.player = new NilsonPlayer();
    this.player.load('aqui');

    this.scheduleAqui();
  }

  scheduleAqui() {
    const delay = 1500 + (Math.random() * 1000);
    setTimeout(() => {
      this.aqui();
      this.scheduleAqui();
    }, delay)
  }

  aqui(e) {
    const maxLeft = this.el.clientWidth - this.pin.clientWidth;
    const maxTop = this.el.clientHeight - this.pin.clientHeight;

    const top = maxTop * Math.random();
    const left = maxLeft * Math.random();

    this.player.play('aqui');

    setTimeout(() => {
      this.pin.style.top = `${top}px`;
      this.pin.style.left = `${left}px`;
      this.pin.classList.add('-isVisible');
    }, 650);
  }
}

/* -- ComponentLoader ------------------------------------------------------- */
const componentsMap = {
  'NilsonMaps': NilsonMaps,
}

class ComponentLoader {
  load() {
    const components = document.querySelectorAll('[data-component]');
    forEach(components, (el) => { this.loadComponent(el); });
  }

  loadComponent(el) {
    const componentName = el.getAttribute('data-component');

    if (!componentsMap[componentName]) {
      throw new Error(`Component ${componentName} not found.`);
    }

    const Component = componentsMap[componentName];

    el._component = new Component(el);
  }
}

/* -- Bootstrap ------------------------------------------------------------- */
const loader = new ComponentLoader();
loader.load();
