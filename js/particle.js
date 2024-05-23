class Particle {
  constructor(gameDisplay, displaySize, particleSize) {
    this.gameDisplay = gameDisplay;
    this.particleSize = particleSize;
    this.isDeadly = Math.random() < 0.07;
    this.left =
      Math.random() >= 0.5
        ? Math.floor(
            (Math.random() * displaySize - displaySize / 10) / 2 +
              displaySize / 10
          )
        : 0;
    this.top =
      this.left === 0
        ? Math.floor((Math.random() * displaySize) / 2 + displaySize / 10)
        : 0;
    this.element = document.createElement("div");
    this.element.style.backgroundColor = this.isDeadly
      ? "white"
      : `hsl(${Math.round(6 * Math.random()) * 60}, 100%, 50%)`;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.particleSize}px`;
    this.element.style.height = `${this.particleSize}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameDisplay.appendChild(this.element);
  }

  move() {
    // Move the obstacle down by 1px
    this.top += 1;
    this.left += 1;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }

  updatePosition() {
    // Update particle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
