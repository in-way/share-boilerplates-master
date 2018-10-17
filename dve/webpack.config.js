// 额外配置，会和默认配置合并
// env下的配置会和其他配置合并，对应不同环境下的最终配置
module.exports = {
    env: {
        development: {
            extraBabelOptions: {
                plugins: ["dva-hmr"]
            }
        },
        production: {
            extraBabelOptions: {}
        }
    },
    extraBabelOptions: {
        plugins: [["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }]]
    },
    extraProvidePlugin: {
        $: "jquery",
        jquery: "jquery",
        jQuery: "jquery"
    },
    alias: {
        components: "./src/components"
    },
    proxy: {
        "/dve/scurd/remote.action": {
            target: "http://localhost:8011/"
        },
        "/dve/dveServlet": {
            target: "http://localhost:8011/"
        }
    },
    theme: "./src/theme.js",
    extraEntrys: {
        manager: "./node_modules/@share/dve/src/manager/menu/index.js",
        query: "./node_modules/@share/scurd/main.js",
        pageWidget: "./node_modules/@share/dve/src/manager/WidgetPageRouter.js",
        page: "./node_modules/@share/dve/src/index/index.js"
    },
    extraHtmls: [
        {
            filename: "query.html",
            title: "在线表单",
            inject: true,
            template: "./node_modules/@share/scurd/index.html",
            chunks: ["query"]
        },
        {
            filename: "manager.html",
            title: "管理页面",
            inject: true,
            template: "./node_modules/@share/dve/src/manager/menu/index.html",
            chunks: ["manager"]
        },
        {
            filename: "pageWidget.html",
            title: "PageWidget页面",
            inject: true,
            template: "./node_modules/@share/dve/src/manager/index.html",
            chunks: ["pageWidget"]
        },
        {
            filename: "dveIndex.html",
            title: "视觉系统",
            inject: true,
            template: "./node_modules/@share/dve/src/index/index.html",
            chunks: ["page"]
        }
    ],
    extraRules: [
        {
            test: /eos3(\.min)?\.js$/,
            use: [
                {
                    loader: "imports-loader?defined=>false,this=>window"
                },
                {
                    loader: "exports-loader?eos"
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /Service\.js$/,
            use: "imports-loader?define=>false,this=>window",
            exclude: /node_modules/
        },
        {
            test: /\.js$/,
            use: "imports-loader?define=>false,this=>window,template=art-template",
            include: /ulynlist-ext/
        },
        {
            test: /(ulynlist\.js$)|(ulynlist.table\.js$)|(ulynlist.pagebar\.js$)/,
            use: "imports-loader?define=>false,this=>window,template=art-template"
        },
        {
            test: /template\.js$/,
            use: [
                {
                    loader: "imports-loader?this=>window,define=>false"
                },
                {
                    loader: "exports-loader?template=window.template"
                }
            ]
        },
        {
            test: /ext\.js$/,
            use: "imports-loader?define=>false,this=>window,template=art-template",
            include: /shareTab/
        },
        {
            test: /zeus\.auth/,
            use: [
                {
                    loader: "imports-loader?define=>false,this=>window"
                }
            ]
        }
    ],
    isDve: true,
    publicPath: "/dve/"
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
