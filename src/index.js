import Game from "./game";

import styles from "./styles/main.scss";

const playButton = document.getElementById("playButton");
const mainMenu = document.getElementById("mainMenu");
const canvas = document.getElementById("world");
export const gameOverMenu = document.getElementById("gameOver");
const playAgain = document.getElementById("playAgain");
export const scoreSpan = document.getElementById("gameOverScore");

window.onload = () => {

    const spaceListener = (e) => {
        if(e.key === " "){
            startGame();
        }
    }
    window.addEventListener("keypress", spaceListener, {once: true});
    playButton.addEventListener("click", (e) => {
        window.removeEventListener("keypress", spaceListener);
        startGame();
    });
    playAgain.addEventListener("click", (e) => {
        startGame();
    });
}

const startGame = () => {
    mainMenu.style.display = "none";
    gameOverMenu.style.display = "none";
    canvas.style.display = "block";
    new Game();
}