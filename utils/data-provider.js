const fs = require('fs');
const path = require('path');

const getPath = (folder) => {
    return path.join(__dirname, '..', folder);
};

const createList = (path) => {
    const files = fs.readdirSync(path);
    const names = files.map(item => {
        const extensionIndex = item.indexOf('.svg');
        if (extensionIndex === -1) {
            return null;
        }
        const extension = item.substring(extensionIndex, item.length);
        if (extension !== '.svg') {
            return null;
        }
        const name = item.replace('.svg', '')
            .replace('libre-', '');
        return name;
    });
    const filtered = names.filter(item => item != null);
    return filtered;
};

const createSvgInclude = () => {
    const svgPATH = getPath('svg')
    if (!fs.existsSync(svgPATH)) {
        console.log(`the svg folder not found, please, get this from LibreICONS repository!`);
    } else {
        const list = createList(svgPATH);
        let html = '<ul>'
                 + list.map(icon => {
                     const svg = fs.readFileSync(getPath(`svg/libre-${icon}.svg`)).toString();
                     var itemHtml = `<li title="${icon}" name="${icon}">`
                                  + `   <i class="libre libre-4x" data-icon="${icon}">${svg}</i>`
                                  + '</li>';
                    return itemHtml;
                 }).join('')
                 + '</ul>';
        fs.writeFileSync(getPath('docs/_includes/libre-icons.html'), html);
    }
}

const createSvgColorInclude = () => {
    const svgPATH = getPath('svg-color')
    if (!fs.existsSync(svgPATH)) {
        console.log(`the svg-color folder not found, please, get this from LibreICONS repository!`);
    } else {
        const list = createList(svgPATH);
        let html = '<ul>'
                 + list.map(icon => {
                     const svg = fs.readFileSync(getPath(`svg-color/libre-${icon}.svg`)).toString();
                     var itemHtml = `<li title="${icon}" data-color="true" name="${icon}">`
                                  + `   <i class="libre libre-4x" data-color="true" data-icon="${icon}">${svg}</i>`
                                  + '</li>';
                    return itemHtml;
                 }).join('')
                 + '</ul>'
        fs.writeFileSync(getPath('docs/_includes/libre-color-icons.html'), html);
    }
}

createSvgInclude();
createSvgColorInclude();