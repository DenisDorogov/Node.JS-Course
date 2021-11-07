const fs =  require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
let dirName = './';
let list = fs.readdirSync(dirName);

const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();

function outputDir(res, subDir) {
    console.log('subDir: ', subDir);
    if (subDir) {
        dirName = dirName + subDir;
        console.log('dirName + subDir: ', dirName);
    };
    list = fs.readdirSync(dirName);
    console.log('dirName: ', dirName);
    console.log('list: ', list);
    list.forEach(el => {
        res.write('<a href="/' + el + '">' + el + '</a><br>');
    });
};

function choiceFile(res, fileName) {
            console.log('fileName: ', fileName);
            if (isFile(fileName)) {
                // const fullPath = path.join(executionDir, fileName);
                // fs.readFile(fullPath, 'utf-8', (err, data) => {
                // if (err) console.log(err);
                // else console.log(data);
                // dataString = data;
                console.log('Open file: ', fileName);

            } else {
               outputDir(res, fileName);
            };
        };




const server = http.createServer((req, res) => {
    // console.log('req.url: ', req.url);
    outputDir(res);
    if (req.url !== '/favicon.ico') {
        list.forEach(el => {
            if (req.url === '/' + el) {
                choiceFile(res, el);
                res.end();
            };
        });
       
        res.end();
    };
});

server.listen(5555);

