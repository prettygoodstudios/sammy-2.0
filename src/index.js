import Game from "./game";

import styles from "./styles/main.scss";

const playButton = document.getElementById("playButton");
export const mainMenu = document.getElementById("mainMenu");
const canvas = document.getElementById("world");

window.onload = () => {
    //new Game();
    playButton.addEventListener("click", (e) => {
        mainMenu.style.display = "none";
        canvas.style.display = "block";
        new Game();
    });
}