window.onload = function () {
  let game;

  const possibleKeystrokes = [
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "KeyA",
    "KeyW",
    "KeyD",
    "KeyS",
  ];

  function startGame() {
    if (game) game.destructor();
    game = new Game();
    game.start();
  }

  function handleKeydown(event) {
    const key = event.code;
    if (!game) startGame();
    else if (game.gameIsOver && key === "Space") startGame();
    else if (!game.gameIsOver && possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowLeft":
        case "KeyA":
          game.player.directionX = -2;
          break;
        case "ArrowUp":
        case "KeyW":
          game.player.directionY = -2;
          break;
        case "ArrowRight":
        case "KeyD":
          game.player.directionX = 2;
          break;
        case "ArrowDown":
        case "KeyS":
          game.player.directionY = 2;
          break;
      }
    }
  }

  function handleKeyup(event) {
    const key = event.code;
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowLeft":
        case "ArrowRight":
        case "KeyA":
        case "KeyD":
          game.player.directionX = 0;
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "KeyW":
        case "KeyS":
          game.player.directionY = 0;
          break;
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
