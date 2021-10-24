const colors = require('colors');
const [from, to] = process.argv.slice(2);
const listOfColors = ['green', 'yellow', 'red'];
let count = 0;

function output(n) {
    console.log(colors[listOfColors[count % 3]](n));
}

function validation() {
    nFrom = Number(from);
    nTo = Number(to);
    if (!(Number.isInteger(nFrom) && Number.isInteger(nTo))) {
        console.log(colors.red("Enter integer number"));
        return; 
    };
    if (nTo < 3) {
        console.log(colors.red("Enter number more"));
        return;
    };
    if (nFrom > nTo) {
        console.log(colors.red("Second number must be more"));
        return;
    };
    if (nFrom < 2) nFrom = 2;
    engine(nFrom, nTo);
};
 

function engine(from, to) {
    for (let i = from; i <= to; i++) {
        if (i == 2) {
            output(i);
            count++;
        };
        for (let j = i-1; j > 1; j--) {
            // console.log('i = ', i, 'j = ', j);
            if (i % j == 0) {
                // console.log('i % j', i % j == 0);
                j = 0;
            };
            if (j == 2) {
                output(i);
                count++;
            };
        };
    };
;}

validation();


