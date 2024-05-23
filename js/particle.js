const DEADLY = 0.3;
const OFFSET_CORNER = 5;

class Particle {
  constructor(gameDisplay, displaySize, particleSize) {
    this.gameDisplay = gameDisplay;
    this.isDeadly = Math.random() < DEADLY;
    this.particleSize = this.#generateParticleSize(particleSize);
    this.left = 0;
    this.top = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.#generateStartPosition(displaySize, particleSize, OFFSET_CORNER);
    this.element = document.createElement("div");
    this.element.style.backgroundColor = this.#generateColor();
    this.element.style.border = this.#generateBorder();
    this.element.style.position = "absolute";
    this.element.style.width = `${this.particleSize}px`;
    this.element.style.height = `${this.particleSize}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameDisplay.appendChild(this.element);
  }

  #generateParticleSize(ps) {
    if (this.isDeadly) return Math.round(1.7 * ps);
    return ps;
  }

  #generateColor() {
    if (this.isDeadly) return "black";
    return `hsl(${Math.round(6 * Math.random()) * 60}, 100%, 50%)`;
  }

  #generateBorder() {
    if (!this.isDeadly) return null;
    return "3px solid white";
  }

  #generateStartPosition(ds, ps, off) {
    switch (Math.ceil(Math.random() * 4)) {
      case 0:
      case 1: // spawn left
        this.left = -this.particleSize;
        this.top = Math.floor(Math.random() * ds - ds / off) + ds / off;
        this.#generateDirection(1);
        break;
      case 2: // spawn top
        this.left = Math.floor(Math.random() * ds - ds / off) + ds / off;
        this.top = -this.particleSize;
        this.#generateDirection(2);
        break;
        break;
      case 3: // spawn right
        this.left = ds + this.particleSize;
        this.top = Math.floor(Math.random() * ds - ds / off) + ds / off;
        this.#generateDirection(3);
        break;
      case 4: // spawn bottom
        this.left = Math.floor(Math.random() * ds - ds / off) + ds / off;
        this.top = ds + this.particleSize;
        this.#generateDirection(4);
        break;
    }
  }

  #generateDirection(pos) {
    switch (pos) {
      case 1: // spawn left
        this.directionX = 1;
        this.directionY = Math.floor(Math.random() * 3) - 1;
        break;
      case 2: // spawn top
        this.directionX = Math.floor(Math.random() * 3) - 1;
        this.directionY = 1;
        break;
      case 3: // spawn right
        this.directionX = -1;
        this.directionY = Math.floor(Math.random() * 3) - 1;
        break;
      case 4: // spawn bottom
        this.directionX = Math.floor(Math.random() * 3) - 1;
        this.directionY = -1;
        break;
    }
  }

  randomizeDirection(p) {
    if (this.isDeadly) p *= 2;
    if (Math.random() > p) return;
    do {
      this.directionX = Math.floor(Math.random() * 3) - 1;
      this.directionY = Math.floor(Math.random() * 3) - 1;
    } while (this.directionX === 0 && this.directionY === 0);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
