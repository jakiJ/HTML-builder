const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const pathToDir = path.join(__dirname, 'styles');
// const writeFile = fs.createWriteStream(`${__dirname}/project-dist/bundle.css`)

// fs.mkdir(`${__dirname}/project-dist`,{recursive: true}, (error) => {
//     if (error) throw error;
//   });

async function styleBundler(pathDir) {
    await fsPromises.rm(`${__dirname}/project-dist/bundle.css`, { recursive: true, force: true })
    const writeFile = fs.createWriteStream(`${__dirname}/project-dist/bundle.css`)
    fs.readdir(pathDir, (error, items) => {
        if (error) throw error;
        items.forEach(item => {
            if (path.extname(`${pathDir}/${item}`) == '.css') {
                const readFile = fs.createReadStream(`${pathDir}/${item}`)
                readFile.pipe(writeFile, { end: false })
            }
        })
    })
}

styleBundler(pathToDir)