import { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// eslint-disable-next-line import/no-unresolved
import { Options as HtmlMinifierOptions } from 'html-minifier';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';
import { projectName, projectRoot, resolvePath, __DEV__, hmrPath } from '../env';

const htmlMinifyOptions: HtmlMinifierOptions = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    useShortDoctype: true,
};

function getCssLoaders(importLoaders: number) {
    return [
        __DEV__ ? 'style-loader' : MiniCssExtractLoader,
        {
            loader: 'css-loader',
            options: {
                modules: false,
                sourceMap: true,
                importLoaders,
            },
        },
        {
            loader: 'postcss-loader',
            options: { sourceMap: true },
        },
    ];
}

const commonConfig: Configuration = {
    context: projectRoot,
    entry: ['react-hot-loader/patch', resolvePath(projectRoot, './src/index.tsx')],
    output: {
        publicPath: '/',
        path: resolvePath(projectRoot, './dist'),
        filename: 'js/[name]-[hash].bundle.js',
        // 加盐 hash
        hashSalt: projectName || 'react typescript boilerplate',
    },
    resolve: {
        // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [
        new WebpackBar({
            name: 'react-typescript-boilerplate',
            // react 蓝
            color: '#61dafb',
        }),
        new FriendlyErrorsPlugin(),
        new WebpackBuildNotifierPlugin({ suppressSuccess: true }),
        new CaseSensitivePathsPlugin(),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: projectRoot,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // HtmlWebpackPlugin 会调用 HtmlMinifier 对 HTMl 文件进行压缩
            // 只在生产环境压缩
            minify: __DEV__ ? false : htmlMinifyOptions,
            // 指定 html 模板路径
            template: resolvePath(projectRoot, './public/index.html'),
            // 类型不好定义，any 一时爽...
            // 定义一些可以在模板中访问的模板参数
            templateParameters: (...args: any[]) => {
                const [compilation, assets, assetTags, options] = args;
                const rawPublicPath = commonConfig.output!.publicPath!;
                return {
                    compilation,
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        tags: assetTags,
                        files: assets,
                        options,
                    },
                    // 除掉 publicPath 的反斜杠，让用户在模板中拼接路径更自然
                    PUBLIC_PATH: rawPublicPath.endsWith('/')
                        ? rawPublicPath.slice(0, -1)
                        : rawPublicPath,
                };
            },
        }),
        new CopyPlugin([
            {
                context: resolvePath(projectRoot, './public'),
                from: '*',
                to: resolvePath(projectRoot, './dist'),
                toType: 'dir',
                ignore: ['index.html'],
            },
        ]),
    ],
    module: {
        rules: [
            {
                // 导入 jsx 的人少喝点
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                // 开启缓存
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: getCssLoaders(1),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        // 先让 less-loader 将 less 文件转换成 css 文件
                        // 再交给 css-loader 处理
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'sass-loader',
                        options: {
                            // 中间每个 loader 都要开启 sourcemap，才能生成正确的 soucemap
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 图片低于 10k 会被转换成 base64 格式的 dataUrl
                            limit: 10 * 1024,
                            // [hash] 占位符和 [contenthash] 是相同的含义
                            // 都是表示文件内容的 hash 值，默认是使用 md5 hash 算法
                            name: '[name].[contenthash].[ext]',
                            // 保存到 images 文件夹下面
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
};

if (__DEV__) {
    (commonConfig.entry as string[]).unshift(`webpack-hot-middleware/client?path=${hmrPath}`);
}

export default commonConfig;
