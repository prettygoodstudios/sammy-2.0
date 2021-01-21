# Sammy 2.0

JavaScript based 2D platformer game devleoped by Miguel Rust.

## High Level Description

Sammy is built using webpack and babel allowing the use of modules and es6+ syntax. The game is animated using a HTML5 Canvas and the Canvas API. The entrypoint of the application is ```src/index.js```. The ```src/game.js``` file contains the ```Game``` class which handles the game loop and manages the game state. A new game is started by initilializing a new ```Game``` object. The physics directory contains abstract classes that are implemented by concrete ground, lanscape and sprite classes. The physic abstract classes handle collisions, gravity and other things pertaining to physics. There is a helper directory that contains functions that perform tasks which are usefull to various parts of the program. The store and the menu UIs are rendered using the DOM.