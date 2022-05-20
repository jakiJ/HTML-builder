const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit} = process;

const writeFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write(`Print text here \n`);
stdin.on('data', data => {
    const toStr = data.toString().trim();
    if(toStr !== 'exit') {
        writeFile.write(data);
      } else {
          stdout.write(`Good luck with Node.js!`)
          exit();
      }
})

process.on('SIGINT', () => {
    stdout.write(`Good luck with Node.js!`)
    exit()
});