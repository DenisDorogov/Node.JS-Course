const colors = require('colors');
const [from, to] = process.argv.slice(2);
console.log(colors.red("Hello JS from "), colors.green(from), 'to', colors.blue(to) );

