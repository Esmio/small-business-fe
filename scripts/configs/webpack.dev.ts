import { HotModuleReplacementPlugin } from 'webpack';
import merge from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import commonConfig from './webpack.common';

import { projectRoot, resolvePath } from '../env';

const devConfig = merge(commonConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 1024,
            // babel 转换的是我们前端代码，所以是指向前端代码的 tsconfig.json
            tsconfig: resolvePath(projectRoot, './src/tsconfig.json'),
        }),
        new HotModuleReplacementPlugin(),
    ],
});

export default devConfig;
