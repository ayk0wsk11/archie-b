const DISPLAY_SIZE = 700;
const PLAYER_SIZE = 30;
const PARTICLE_SIZE = 10;

const POINTS_PER_SCORE = 125;
const COLLECTED_PARTICLE_SIZE = 2 * PARTICLE_SIZE;
const COLLECTED_PARTICLE_MARGIN = 3;
const COLOR_CONTAINER_DIM = 12;
const COLOR_CONTAINER_SIZE =
  COLOR_CONTAINER_DIM *
  (COLLECTED_PARTICLE_SIZE + 2 * COLLECTED_PARTICLE_MARGIN);
const FPS = 60;

class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameDisplay = document.getElementById("game-display");
    this.gameInfo = document.getElementById("game-info");
    this.gameEndScreen = document.getElementById("game-end");
    this.colorContainer = document.getElementById("color-container");
    this.colorContainer.style.width = `${COLOR_CONTAINER_SIZE}px`;
    this.colorContainer.style.height = `${COLOR_CONTAINER_SIZE}px`;
    this.displaySize = DISPLAY_SIZE;
    this.playerSize = PLAYER_SIZE;
    this.particleSize = PARTICLE_SIZE;
    this.player = new Player(
      this.gameDisplay,
      this.displaySize,
      this.playerSize
    );
    this.particles = [];
    this.collectedColors = [];
    this.score = 0;
    this.color = new AverageColor(0, 0, 0, 0);
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / FPS); // 60fps
  }

  start() {
    // Set the height and width of the game screen
    this.gameDisplay.style.height = `${this.displaySize}px`;
    this.gameDisplay.style.width = `${this.displaySize}px`;

    // Hide the start screen and show the game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "flex";
    this.gameEndScreen.style.display = "none";

    // Executes the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    //console.log("gameLoop(): playing");
    this.update();
    if (this.gameIsOver) clearInterval(this.gameIntervalId);
  }

  update() {
    this.player.move();

    this.particles.forEach((particle, id) => {
      particle.move();
      /* If the player collides with an particle. Remove the particle element from the DOM. Remove particle object from the array. Game is */
      if (this.player.didCollide(particle)) {
        if (particle.isDeadly) this.endGame();
        else {
          this.score++;
          const rgb = particle.element.style.backgroundColor.match(/\d+/g);
          this.collectedColors.push(particle.element.style.backgroundColor);
          this.color.addColor(Number(rgb[0]), Number(rgb[1]), Number(rgb[2]));
          particle.element.remove();
          this.particles.splice(id, 1);
          id--;
        }
      } // If the particle is off the screen (at the bottom)
      else if (particle.top > this.displaySize) {
        particle.element.remove();
        this.particles.splice(id, 1);
        id--;
      }
    });

    if (this.gameIsOver) return;

    if (this.score) {
      document.getElementById("avg-color").innerText =
        this.color.getStringAverageColorHex();
      document.getElementById("avg-color").style.color =
        this.color.getStringAverageColorHex();
      document.getElementById("score").innerText = (
        this.score * POINTS_PER_SCORE
      )
        .toString()
        .padStart(7, "0");
      this.player.element.style.border = null;
      this.player.element.style.background =
        this.color.getStringAverageColorHex();
      this.addCollectedColorToContainer();
    }

    // Create a new particle based on a random probability
    // when there is no other particles on the screen
    if (Math.random() > 0.97) {
      this.particles.push(
        new Particle(this.gameDisplay, this.displaySize, this.particleSize)
      );
    }
  }

  addCollectedColorToContainer() {
    while (this.collectedColors.length) {
      if (this.score > COLOR_CONTAINER_DIM ** 2)
        this.colorContainer.removeChild(this.colorContainer.lastChild);
      let color = document.createElement("div");
      color.style.backgroundColor = this.collectedColors.shift();
      color.style.width = `${COLLECTED_PARTICLE_SIZE}px`;
      color.style.height = `${COLLECTED_PARTICLE_SIZE}px`;
      color.style.margin = `${COLLECTED_PARTICLE_MARGIN}px`;
      this.colorContainer.prepend(color);
    }
  }

  endGame() {
    this.gameIsOver = true;
    this.player.element.remove();
    this.particles.forEach((particle) => particle.element.remove());
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
    document.getElementById("avg-color").innerText = "#000000";
    document.getElementById("avg-color").style.color = "white";
    document.getElementById("score").innerText = "0"
      .toString()
      .padStart(7, "0");
    while (this.colorContainer.firstChild) {
      this.colorContainer.removeChild(this.colorContainer.lastChild);
    }
  }
}
