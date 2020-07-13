const envPreset = [
    '@babel/preset-env',
    {
        // 只导入需要的 polyfill
        useBuiltIns: 'usage',
        // 指定 corjs 版本
        corejs: 3,
        // 禁用模块化方案转换
        modules: false,
    },
];

module.exports = function (api) {
    api.cache(true);

    const presets = ['@babel/preset-typescript', envPreset];
    const plugins = ['@babel/plugin-transform-runtime'];

    return {
        presets,
        plugins,
        env: {
            // 开发环境配置
            development: {
                presets: [['@babel/preset-react', { development: true }]],
                plugins: ['react-hot-loader/babel'],
            },
            // 生产环境配置
            production: {
                presets: ['@babel/preset-react'],
                plugins: [
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements',
                ],
            },
        },
    };
};
