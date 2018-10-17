// 额外配置，会和默认配置合并
// env下的配置会和其他配置合并，对应不同环境下的最终配置
const port = 4000;

module.exports = {
    port,
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
        '/remote': {
            target: 'http://localhost:8011/',
            secure: false,
            changeOrigin: true
        },
        '/admin/*': {
            target: `http://localhost:${port}/node_modules/@share/scurd`
        },
        '/scurd/remote.action': {
            target: 'http://localhost:8011/commonQuery/scurd/'
        }
    },
    theme: './src/theme.js',
    extraEntrys: {
        query: './node_modules/@share/scurd/main.js',
        mQuery: './node_modules/@share/scurd/mMain.js',
        adminIndex: './node_modules/@share/scurd/admin/index.js'
    },
    extraHtmls: [
        {
            filename: 'query.html',
            title: '在线表单',
            inject: true,
            template: './node_modules/@share/scurd/index.html',
            chunks: ['query']
        },
        {
            filename: 'admin/index.html',
            title: '在线表单',
            inject: true,
            template: './node_modules/@share/scurd/admin/index.html',
            chunks: ['adminIndex']
        },
        {
            filename: 'mQuery.html',
            title: '手机首页',
            inject: true,
            template: './node_modules/@share/scurd/index.html',
            chunks: ['mQuery']
        }
    ],
    extraRules: [
        {
            test: /eos3(\.min)?\.js$/,
            use: [
                {
                    loader: 'imports-loader?defined=>false,this=>window'
                },
                {
                    loader: 'exports-loader?eos'
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /Service\.js$/,
            use: 'imports-loader?define=>false,this=>window',
            exclude: /node_modules/
        },
        {
            test: /\.js$/,
            use: 'imports-loader?define=>false,this=>window,template=art-template',
            include: /ulynlist-ext/
        },
        {
            test: /(ulynlist\.js$)|(ulynlist.table\.js$)|(ulynlist.pagebar\.js$)/,
            use: 'imports-loader?define=>false,this=>window,template=art-template'
        },
        {
            test: /template\.js$/,
            use: [
                {
                    loader: 'imports-loader?this=>window,define=>false'
                },
                {
                    loader: 'exports-loader?template=window.template'
                }
            ]
        },
        {
            test: /ext\.js$/,
            use: 'imports-loader?define=>false,this=>window,template=art-template',
            include: /shareTab/
        },
        {
            test: /zeus\.auth/,
            use: [
                {
                    loader: 'imports-loader?define=>false,this=>window'
                }
            ]
        }
    ],
    isDve: true,
    publicPath: '/commonQuery/'
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
