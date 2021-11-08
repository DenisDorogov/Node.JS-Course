const fs =  require('fs');
// const path = require('path');
const http = require('http');
const url = require('url');
let currentDir = '.';
let list = fs.readdirSync(currentDir);

// const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();

function outputDir(res, path) {
    currentDir = path + '/';
    list = fs.readdirSync(path);
    console.log('list: ', list);
    list.forEach(el => {
        if (isFile(currentDir + el)) res.write('<a href="' + currentDir + el + '">' + el + '</a><br>');
        else res.write('<a href="' + currentDir + el + '">' + el + '/' + '</a><br>');
    });
};

function choiceFile(res, fileName) {
            let pathFile = currentDir + fileName;
            console.log('pathFile: ', pathFile);
            if (isFile(pathFile)) {
                // const fullPath = path.join(executionDir, fileName);
                // fs.readFile(fullPath, 'utf-8', (err, data) => {
                // if (err) console.log(err);
                // else console.log(data);
                // dataString = data;
                console.log('Open file: ', pathFile);

            } else {
                
               outputDir(res, pathFile);
            };
        };

function getLastItemURN(string) {
    return string.slice(string.lastIndexOf('/') + 1);
};


const server = http.createServer((req, res) => {
    console.log('req.url: ', req.url);
    switch (req.url) {
        case  '/favicon.ico': 
            break;
        case '/' : 
            outputDir(res, '.');
            break;
        default : 
            list.forEach(el => {
                let url = getLastItemURN(req.url);
                // console.log('url: ', url);
                if (url === el) {
                    console.log('el: ', el);
                    choiceFile(res, el);
                    res.end();
                };
            });
    } 
    res.end()
});

server.listen(5555);

