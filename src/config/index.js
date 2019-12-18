const serverurl = serverURLbase;
const getFullPath = (path) => `${serverurl}/${path}`;
export default {
    basePath: serverurl,
    testPath: getFullPath('/home/bjLogin')
}