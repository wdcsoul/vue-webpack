const getHtmlConfig = require('./htmlTemple.js');

const getEntry = (targetObject) => {
    let map = {};
    const entiresArray = Object.entries(targetObject);
    entiresArray.forEach(([chunkName, config]) => {
        map[chunkName] = config.chunkPath;
    });
    return map;
}
const getConfig = (targetObject) => {
    let htmlList = [];
    Object.entries(targetObject).forEach(([chunkName, config]) => {
        htmlList.push(getHtmlConfig({ chunkName: chunkName, title: config.title }))
    });
    return htmlList;
}
module.exports = {
    getEntry,
    getConfig
}