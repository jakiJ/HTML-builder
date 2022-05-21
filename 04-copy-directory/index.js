const fs = require('fs');
const path = require('path');
const { stdout } = process;

const pathToDir = path.join(__dirname, 'files');

fs.mkdir(`${__dirname}/files-copy`,{recursive: true}, (error) => {
    if (error) throw error;
  });

function copyDir(dirPath) {
    fs.readdir(dirPath, (error, items) => {
        if (error) throw error;
        items.forEach(item => {
            const readFile = fs.createReadStream(`${dirPath}/${item}`)
            const writeFile = fs.createWriteStream(`${dirPath}-copy/${item}`)
            readFile.on('data', data => {
                writeFile.write(`${data.toString()}`)
            })
        })
    })
    stdout.write(`Copy directory create or refresh`)
}

copyDir(pathToDir)

// fs.watch(pathToDir, (event) => {
//     if (event == 'change') {
//         copyDir(pathToDir)
//     }
// })