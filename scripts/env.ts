import { resolve } from 'path';

const __DEV__ = process.env.NODE_ENV !== 'production';
const projectRoot = resolve(__dirname, '../');
const hmrPath = '__webpack_hmr';
const projectName = 'react-template';
const isAnalyze = true;

export { __DEV__, projectRoot, resolve as resolvePath, projectName, hmrPath, isAnalyze };
