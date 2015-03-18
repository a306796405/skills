({
    appDir: "../",
    baseUrl: "./js",
    dir: "../output",
    keepBuildDir: false,
    skipModuleInsertion: true,
    removeCombined: true,
    modules: [
        {
            name: 'main',
            include: ['hello', 'slider', 'sort']
        }
    ],
    fileExclusionRegExp: /^(\.|build|demo|output)/,
    onBuildRead: function (moduleName, path, contents) {
        if (moduleName === 'main') {
            return '/* empty code */';
        }
        return contents;
    }
})