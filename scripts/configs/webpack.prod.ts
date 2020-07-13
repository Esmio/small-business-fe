import { BannerPlugin } from 'webpack';
import merge from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SizePlugin from 'size-plugin';
import commonConfig from './webpack.common';

import { projectRoot, resolvePath, isAnalyze } from '../env';

const mergedConfig = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 1024 * 2,
            tsconfig: resolvePath(projectRoot, './src/tsconfig.json'),
        }),
        new BannerPlugin({
            raw: true,
            banner: `/** @preserve Powered by react-typescript-boilerplate (https://github.com/esmio/react-typescript-boilerplate) */`,
        }),
        new MiniCssExtractPlugin({
            // 文件名中插入文件内容的 hash 值
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
            ignoreOrder: false,
        }),
        new SizePlugin({ writeFile: false }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false }), new OptimizeCSSAssetsPlugin()],
    },
});

if (isAnalyze) {
    mergedConfig.plugins!.push(new BundleAnalyzerPlugin());
}

const smp = new SpeedMeasurePlugin();
const prodConfig = smp.wrap(mergedConfig);

export default prodConfig;
