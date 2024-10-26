const path = require('path');

const rootPath = path.join(__dirname, '../..');
const dllPath = path.join(__dirname, '../dll');
const srcPath = path.join(rootPath, 'src');
const appPackagePath = path.join(rootPath, 'package.json');
const appNodeModulesPath = path.join(rootPath, 'node_modules');
const publicPath = path.join(rootPath, 'public');

export default {
  rootPath,
  dllPath,
  srcPath,
  publicPath,
  appPackagePath,
  appNodeModulesPath
};
