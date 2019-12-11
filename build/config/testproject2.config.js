const getHtmlConfig = require('./baseTemple/htmlTemple.js');

const moduleConfigMap = {
    projectone: {
        chunkPath: './src/project/testProject2/projectThree/index.js',
        title: 'page3'
    },
    projecttwo: {
        chunkPath: './src/project/testProject2/projectFour/index.js',
        title: 'page4'
    }
}

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


const pageConfig = {
    entry: getEntry(moduleConfigMap),
    htmlTemple: getConfig(moduleConfigMap)
};

module.exports = pageConfig;
