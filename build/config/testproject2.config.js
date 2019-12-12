const { getEntry, getConfig } = require('./baseTemple/tools');
const moduleConfigMap = {
    projectThree: {
        chunkPath: './src/project/testProject2/projectThree/index.js',
        title: 'page3'
    },
    projectFour: {
        chunkPath: './src/project/testProject2/projectFour/index.js',
        title: 'page4'
    }
}

const pageConfig = {
    entry: getEntry(moduleConfigMap),
    htmlTemple: getConfig(moduleConfigMap)
};

module.exports = pageConfig;
