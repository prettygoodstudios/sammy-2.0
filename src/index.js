import Game from "./game";

import styles from "./styles/main.scss";

const playButton = document.getElementById("playButton");
const mainMenu = document.getElementById("mainMenu");
const canvas = document.getElementById("world");
export const gameOverMenu = document.getElementById("gameOver");
const playAgain = document.getElementById("playAgain");
const scoreSpan = document.getElementById("gameOverScore");

const spaceListener = (e) => {
    if(e.key === " "){
        startGame();
    }
}
window.addEventListener("keypress", spaceListener, {once: true});

window.onload = () => {
    playButton.addEventListener("click", (e) => {
        startGame();
    });
    playAgain.addEventListener("click", (e) => {
        startGame();
    });
}

const startGame = () => {
    window.removeEventListener("keypress", spaceListener);
    mainMenu.style.display = "none";
    gameOverMenu.style.display = "none";
    canvas.style.display = "block";
    new Game();
}

export const showGameOver = (score) => {
    gameOverMenu.display = "flex";
    canvas.style.display = "none";
    gameOverMenu.style.display = "flex";
    scoreSpan.innerHTML = score;
    window.addEventListener("keypress", spaceListener, {once: true});
}