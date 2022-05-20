const fs = require('fs');
const path = require('path');
const { stdout } = process;

const fileData = fs.createReadStream(path.join(__dirname,'text.txt'), 'utf-8')
let data = '';
fileData.on('data', chunk => data += chunk);
fileData.on('end', () => stdout.write(`\n ${data}`));
fileData.on('error', error => stdout.write(`${error}`))
