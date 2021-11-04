#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');
// const readline = require('readline');
// const yargs = require('yargs');
const inquirer = require('inquirer');

// const LOG_FILE = './access.log';

// console.log(process.argv);
// fs.readFile(LOG_FILE, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });
// fs.readFile(process.argv[2], 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// const options = yargs
//     .usage('Usage: -p <path to the file>')
//     .option('p', {
//         alias: 'path',
//         // alias: ['path', 'path2']
//         describe: 'Path to the file',
//         type: 'string',
//         demandOption: true,
//     }).argv;
//
// console.log(options);

// fs.readFile(options.p, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Please enter the path to the file: ', (filePath) => {
//     console.log('path:', filePath);
//     // rl.close();
//     rl.question('Please enter the encoding: ', (encoding) => {
//         console.log('encoding:', encoding);
//         rl.close();
//     });
// });

// const question = async (question) => new Promise(resolve => rl.question(question, resolve));
//
// (async () => {
//     const filePath = await question('Please enter the path to the file: ');
//     // const fullPath = path.join(__dirname, filePath);
//     const fullPath = path.resolve(__dirname, filePath);
//     console.log(fullPath);
//     const encoding = await question('Please enter the encoding: ');
//
//     // const data = fs.readFileSync(filePath, encoding);
//     // console.log(data);
//     // rl.close();
//
//     fs.readFile(fullPath, encoding, (err, data) => {
//         console.log(data);
//         rl.close();
//     });
// })()
const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
let list = fs.readdirSync('./')//.filter(isFile);
console.log(list);

function choiceFile(list) {
    
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', // input, number, confirm, list, checkbox, password
            message: 'Choose a file to read',
            choices: list,
        },
    ])
        .then(({ fileName }) => {
            // console.log(typeof(fileName));
            if (isFile(fileName)) {
                const fullPath = path.join(executionDir, fileName);
    
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                if (err) console.log(err);
                else console.log(data);
            });
            } else {
                
                console.log('./' + fileName);
               choiceFile(fs.readdirSync('./' + fileName + '/'));
            };
            
        });
};

choiceFile(list);


