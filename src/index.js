import Game from "./game";

import styles from "./styles/main.scss";

const playButton = document.getElementById("playButton");
export const mainMenu = document.getElementById("mainMenu");
const canvas = document.getElementById("world");

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
}

const startGame = () => {
    mainMenu.style.display = "none";
    canvas.style.display = "block";
    new Game();
}