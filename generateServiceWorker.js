const fs = require("fs");

const files = [];

const dir = fs.readdir("./dist", (error, directory) => {
    directory.forEach(file => {
        files.push(file);
    });
});

fs.readFile("./serviceWorker.js", (error, data) => {
    const contents = data.toString();
    const segments = contents.split("cacheAssets = [");
    console.log(segments[0].split("'")[1].slice(1));
    segments[0] = `const cacheName = 'v${parseInt(segments[0].split("'")[1].slice(1))+1}';\nconst `;
    segments[0] += "cacheAssets = [";
    segments[1] = "\n];"+segments[1].split("];")[1];
    segments[1] = `\t\n'index.html',${segments[1]}`;
    for (file of files) {
        segments[1] = `\t\n'../dist/${file}',${segments[1]}`;
    }
    const newContents = segments.join("");
    fs.writeFile("./serviceWorker.js", newContents, () => {
        console.log("Wrote");
    });
});