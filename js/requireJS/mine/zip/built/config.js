({
    appDir: "../",
    baseUrl: "./js",
    dir: "../output",
    shim: {
        easyTabs: {
            deps: ['jquery'],
            exports: "easyTabs"
        },
        jquery: {
            exports: "$"
        }
    },
    paths: {
        jquery: 'http://libs.baidu.com/jquery/1.10.2/jquery',
        easyTabs: '../lib/jquery.easytabs'
    },
    modules: ['index','content']
})
