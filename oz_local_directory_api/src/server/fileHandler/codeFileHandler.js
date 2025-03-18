import fs from 'fs';

async function readCodesFromFile() {
    const data = fs.readFileSync('.../data/codes.json');
    return JSON.parse(data);
}

async function writeToCodeFile() {
    fs.writeFileSync('.../data/codes.json', data);
}


export default writeToCodeFile();