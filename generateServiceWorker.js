const fs = require("fs");

const files = [];

const dir = fs.readdir("./dist", (error, directory) => {
    directory.forEach(file => {
        files.push(file);
    });
});

const workerFile = fs.readFile("./serviceWorker.js", (error, data) => {
    const contents = data.toString();
    const segments = contents.split("cacheAssets = [");
    segments[0] += "cacheAssets = [";
    segments[1] = "\n];"+segments[1].split("];")[1];
    for (file of files) {
        //segments[1] = `\t\n'../${file}',${segments[1]}`;
        segments[1] = `\t\n'../dist/${file}',${segments[1]}`;
    }
    const newContents = segments.join("");
    fs.writeFile("./serviceWorker.js", newContents, () => {
        console.log("Wrote");
    });
});