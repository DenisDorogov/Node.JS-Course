const colors = require('colors');
const [from, to] = process.argv.slice(2);
const listOfColors = ['green', 'yellow', 'red'];
let count = 0;

function output(n) {
    console.log(colors[listOfColors[count % 3]](n));
}


for (let i = from; i <= to; i++) {
    for (let j = i - 1; j > 1; j--) {
        if (i % j == 0) {
            break;
        };
        if (j == 2) {
            output(i);
            count++;
        };
    };
};