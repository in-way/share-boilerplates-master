// 额外配置，会和默认配置合并
// env下的配置会和其他配置合并，对应不同环境下的最终配置
module.exports = {
    env: {
        development: {
            extraBabelOptions: {
                plugins: ['dva-hmr']
            }
        },
        production: {
            extraBabelOptions: {}
        }
    },
    extraBabelOptions: {
        plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]]
    },
    extraProvidePlugin: {
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery'
    },
    alias: {
        components: './src/components'
    },
    proxy: {
        '/mockApi': {
            target: 'http://192.168.0.62:3000/mock/48',
            pathRewrite: { '^/mockApi': '' }
        },
        '/api': {
            target: 'http://www.prodenv.com/api',
            changeOrigin: true
        }
    },
    theme: './src/theme.js'
    // port: 4000,
    // extraEntrys: {},
    // extraHtmls: [],
    // extraRules: [],
    // disableCSSModules: false,
    // cssModulesExclude: [],
    // publicPath: '/',
    // outputPath: '/',
    // extraBabelOptions: {},
    // extraResolveExtensions: [],
    // hash: true,
    // devtool: '#cheap-module-eval-source-map',
    // autoprefixer: {},
    // proxy: {},
    // externals: {},
    // library: '',
    // libraryTarget: 'var',
    // define: {},
    // sassOption: {},
    // theme: '',
    // MPA: true,
    // extraProvidePlugin: {},
    // alias: {},
    // isDve: false,
};
