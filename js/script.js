window.onload = function () {
  let game;

  const possibleKeystrokes = [
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
  ];

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  function restartGame() {
    location.reload();
  }

  function handleKeydown(event) {
    const key = event.code;
    if (!game) startGame();
    else if (game.gameIsOver && key === "Space") startGame();
    else if (!game.gameIsOver && possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -2;
          break;
        case "ArrowUp":
          game.player.directionY = -2;
          break;
        case "ArrowRight":
          game.player.directionX = 2;
          break;
        case "ArrowDown":
          game.player.directionY = 2;
          break;
      }
    }
  }

  function handleKeyup(event) {
    const key = event.code;
    //console.log("handleKeyup(): ", key);
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      switch (key) {
        case "ArrowLeft":
        case "ArrowRight":
          game.player.directionX = 0;
          break;
        case "ArrowUp":
        case "ArrowDown":
          game.player.directionY = 0;
          break;
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
