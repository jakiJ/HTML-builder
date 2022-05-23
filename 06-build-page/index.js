const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const { stdout } = process;

//pathes to dir

const dirStyle = path.join(__dirname, 'styles')
const dirComponents = path.join(__dirname, 'components')
const dirAssets = path.join(__dirname, 'assets')

//потоки для записи

const writeStyle = fs.createWriteStream(`${__dirname}/project-dist/style.css`)
const writeIndex = fs.createWriteStream(`${__dirname}/project-dist/index.html`)

//папка для сбора всех компонентов

fs.mkdir(`${__dirname}/project-dist`,{recursive: true}, (error) => {
    if (error) throw error;
  });

function bundlerProject(stylePath, htmlPath, assetsPath) {
    // bundler style
    fs.readdir(stylePath, (err, styleFiles) => {
        if (err) throw err;
        styleFiles.forEach((styleFile) => {
            const readStyle = fs.createReadStream(`${stylePath}/${styleFile}`)
            readStyle.on('data', (data) => writeStyle.write(data))
        })
    })

    // bundler assets
    fs.mkdir(`${__dirname}/project-dist/assets`, {recursive: true}, (err) => {
        if (err) throw err;
    })

    function bundlerAssets (outputDir, inputDir) {
        fs.readdir(outputDir, (err, assets) => {
            if (err) throw err;
            assets.forEach(asset => {
                fs.mkdir(`${__dirname}/project-dist/assets/${asset}`, {recursive: true}, (err) => {
                    if (err) throw err;
                })
                fs.readdir(`${outputDir}/${asset}`, (err, files) => {
                    if (err) throw err;
                    files.forEach(file => {
                        const readFile = fs.createReadStream(`${outputDir}/${asset}/${file}`)
                        const writeFile = fs.createWriteStream(`${inputDir}/${asset}/${file}`)
                        readFile.on('data', data => {
                            writeFile.write(data)
                        })
                    })
                })
            })
        })
    }
    bundlerAssets(assetsPath, `${__dirname}/project-dist/assets`)

    //bundler html
    const pathTemplete = path.join(__dirname, 'template.html');
    const readTemplate = fs.createReadStream(pathTemplete,'utf-8');
    let textTemplate = '';
    readTemplate.on('data', data => textTemplate += data);
    readTemplate.on('end', () => {
        fs.readdir(htmlPath, (err, components) => {
            if (err) throw err;
            components.forEach((component, index) => {
                const name = component.split('.').filter(word => word !== 'html').join('').trim();
                const readComponent = fs.createReadStream(`${htmlPath}/${component}`);
                let textComponent = '';
                readComponent.on('data', data => textComponent += data);
                readComponent.on('end', () => {
                    textTemplate = textTemplate.replace(`{{${name}}}`, textComponent);
                    if (index == components.length - 1) {
                        writeIndex.write(textTemplate)
                    }
                })
            })
        })
    })
}

bundlerProject(dirStyle, dirComponents, dirAssets)