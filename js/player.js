class Player {
  constructor(gameDisplay, displaySize, playerSize) {
    this.gameDisplay = gameDisplay;
    this.left = (displaySize - playerSize) / 2;
    this.top = (displaySize - playerSize) / 2;
    this.displaySize = displaySize;
    this.playerSize = playerSize;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("div");
    this.element.style.backgroundColor = "black";
    this.element.style.border = "6px double white";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.playerSize}px`;
    this.element.style.height = `${this.playerSize}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameDisplay.appendChild(this.element);
  }

  move() {
    // Update player's position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;
    // Ensure the player stays within the game screen
    if (this.left < 5) this.left = 5;
    if (this.top < 5) this.top = 5;
    if (this.left > this.displaySize - this.playerSize - 5)
      this.left = this.displaySize - this.playerSize - 5;
    if (this.top > this.displaySize - this.playerSize - 5)
      this.top = this.displaySize - this.playerSize - 5;
    // Update the player's position on the screen
    this.updatePosition();
  }

  didCollide(particle) {
    const playerRect = this.element.getBoundingClientRect();
    const particleRect = particle.element.getBoundingClientRect();
    return (
      playerRect.left < particleRect.right &&
      playerRect.right > particleRect.left &&
      playerRect.top < particleRect.bottom &&
      playerRect.bottom > particleRect.top
    );
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
