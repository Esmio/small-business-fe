declare module 'speed-measure-webpack-plugin' {
    import { Configuration, Plugin } from 'webpack';

    // 查看官方文档，需要哪些选项就声明哪些选项就行
    // 可以看出 TypeScript 是非常灵活的
    interface SpeedMeasurePluginOptions {
        disable: boolean;
        // eslint-disable-next-line @typescript-eslint/ban-types
        outputFormat: 'json' | 'human' | 'humanVerbose' | ((outputObj: object) => void);
        outputTarget: string | ((outputObj: string) => void);
        // eslint-disable-next-line @typescript-eslint/ban-types
        pluginNames: object;
        granularLoaderData: boolean;
    }

    // 继承 Plugin 类, Plugin 类都有 apply 方法
    class SpeedMeasurePlugin extends Plugin {
        constructor(options?: Partial<SpeedMeasurePluginOptions>);
        wrap(webpackConfig: Configuration): Configuration;
    }

    export = SpeedMeasurePlugin;
}

declare module 'size-plugin' {
    import { Plugin } from 'webpack';

    interface SizePluginOptions {
        pattern: string;
        exclude: string;
        filename: string;
        publish: boolean;
        writeFile: boolean;
        // eslint-disable-next-line @typescript-eslint/ban-types
        stripHash: Function;
    }

    class SizePlugin extends Plugin {
        constructor(options?: Partial<SizePluginOptions>);
    }

    export = SizePlugin;
}
