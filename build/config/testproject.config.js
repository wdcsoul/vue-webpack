const { getEntry, getConfig } = require('./baseTemple/tools');
const moduleConfigMap = {
    projectone: {
        chunkPath: './src/project/testProject/projectone/index.js',
        title: 'page1'
    },
    projecttwo: {
        chunkPath: './src/project/testProject/projecttwo/index.js',
        title: 'page2'
    }
}
const pageConfig = {
    entry: getEntry(moduleConfigMap),
    htmlTemple: getConfig(moduleConfigMap)
};

module.exports = pageConfig;
