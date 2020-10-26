export default class PauseMenu {

    constructor(pause, unPause, exit){
        this.pauseDiv = document.createElement("div");
        this.pauseDiv.className = "pause";
        this.unPause = unPause;
        this.pause = pause;
        this.exit = exit;
        this.addPauseBtn();
        document.body.appendChild(this.pauseDiv);
    }

    addPauseBtn = () => {
        const pauseButton = document.createElement("button");
        pauseButton.innerHTML = "||";
        pauseButton.className = "pause__btn";
        pauseButton.addEventListener("click", this.pauseGame);
        this.pauseDiv.appendChild(pauseButton);
    }

    pauseGame = () => {
        this.pause();
        this.showMenu();
    }

    showMenu = () => {
        const menu = document.createElement("div");
        menu.className = "pause__menu";

        const resume = document.createElement("button");
        resume.className = "pause__menu__btn";
        resume.innerHTML = "Resume";
        resume.addEventListener("click", this.resume);
        menu.appendChild(resume);

        const exit = document.createElement("button");
        exit.className = "pause__menu__btn";
        exit.innerHTML = "Go Home";
        exit.addEventListener("click", this.goHome);
        menu.appendChild(exit);

        this.pauseDiv.appendChild(menu);
        document.querySelector(".pause__btn").remove();
    }

    hideMenu = () => {
        document.querySelector(".pause__menu").remove();
        this.addPauseBtn();
    }

    resume = () => {
        this.hideMenu();
        this.unPause();
    }

    goHome = () => {
        this.hideMenu();
        this.exit();
    }

    remove = () => {
        this.pauseDiv.remove();
    }
}