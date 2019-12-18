const spawn = require('cross-spawn');
const path = require('path');
process.env.NODE_ENV = 'development';
const projectName = process.argv[2];
const serverName = process.argv[3];
const porject = ['--projectName', `${projectName}`, '--serverName', `${serverName}`];
const webpackServer = path.resolve(__dirname, '../node_modules/webpack-dev-server/bin/webpack-dev-server.js');
const args = ['--hot', '--inline', '--progress', '--config', 'build/webpack-dev-config.js'];

// 上面拼凑npm script 指令，结果是：
// webpack-dev-server --projectName ${projectName}  --hot --inline --progress --config build/webpack-dev-config.js
// -- 后面跟变量名，如果后面没有值，就默认为值为true 例如： --hot  就表示 hot = true 

const cwd = path.resolve(__dirname, '../');
spawn(webpackServer, [...porject, ...args], { cwd, stdio: ["pipe", process.stdout, process.stderr] });










