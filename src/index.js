import Game from "./game";
import { instantiateGrassImages } from "./grounds/ground";
import { loadCoinSprites } from "./landscapes/coin";
import { instantiateUfoImages } from "./sprites/ufo";
import { constructRobotImages } from "./sprites/robot";

import styles from "./styles/main.scss";

const playButton = document.getElementById("playButton");
const mainMenu = document.getElementById("mainMenu");
const canvas = document.getElementById("world");
const gameOverMenu = document.getElementById("gameOver");
const playAgain = document.getElementById("playAgain");
const scoreSpan = document.getElementById("gameOverScore");

const spaceListener = (e) => {
    if(e.key === " "){
        startGame();
    }
}
window.addEventListener("keypress", spaceListener, {once: true});

window.onload = () => {
    constructRobotImages();
    instantiateGrassImages();
    instantiateUfoImages();
    loadCoinSprites();
    showMainMenu();
}

playButton.addEventListener("click", (e) => {
    startGame();
});
playAgain.addEventListener("click", (e) => {
    startGame();
});

export const showMainMenu = () => {
    mainMenu.style.display = "grid";
    gameOverMenu.style.display = "none";
    canvas.style.display = "none";
    const pause = document.querySelector(".pause");
    if(pause){
        pause.remove();
    }
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