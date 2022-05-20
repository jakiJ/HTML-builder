const fs = require('fs');
const path = require('path');
const { stdout } = process;

// fs.readFile(
//     path.join(__dirname,'text.txt'),
//     'utf-8',
//     (err, data) => {
//         if (err) throw err;
//         console.log(data)
//     }
// )

const fileData = fs.createReadStream(path.join(__dirname,'text.txt'))
let data = '';
fileData.on('data', chunk => data += chunk);
fileData.on('end', () => stdout.write(`\n ${data}`));
fileData.on('error', error => stdout.write(`${error}`))
