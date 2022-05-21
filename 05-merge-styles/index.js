const fs = require('fs');
const path = require('path');

const pathToDir = path.join(__dirname, 'styles');
const writeFile = fs.createWriteStream(`${__dirname}/project-dist/bundle.css`)

fs.mkdir(`${__dirname}/project-dist`,{recursive: true}, (error) => {
    if (error) throw error;
  });

function styleBundler(pathDir) {
    fs.readdir(pathDir, (error, items) => {
        if (error) throw error;
        items.forEach(item => {
            if (path.extname(`${pathDir}/${item}`) == '.css') {
                const readFile = fs.createReadStream(`${pathDir}/${item}`)
                readFile.on('data', data => {
                    writeFile.write(data)
                })
            }
        })
    })
}

styleBundler(pathToDir)