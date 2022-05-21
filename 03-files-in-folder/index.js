const fs = require('fs');
const path = require('path');
const { stdout } = process;

function returnInfoFile (pathDir) {
    fs.readdir(pathDir, {withFileTypes: true}, (error, files) => {
        if (error) throw error;
        for (const file of files) {
            if (file.isFile()) {
                fs.stat(`${pathDir}/${file.name}`, (error, stats) => {
                    if (error) throw error;
                    const size = `${stats.size / 1000}kb`;
                    const ext = path.extname(`${pathDir}/${file.name}`).split('').filter(symb => symb !== '.').join('');
                    const name = (file.name).split('.').filter(word => word !== ext);
                    stdout.write(`${name} - ${ext} - ${size}\n`)
                })
            } //else if (file.isDirectory()) {
            //     returnInfoFile(`${pathDir}/${file.name}`)
            // }
        }
    })
}

returnInfoFile(path.join(__dirname, 'secret-folder'))