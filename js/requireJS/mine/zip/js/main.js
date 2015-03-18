/**
 * Created by jianglinjie on 15/2/6.
 */

requirejs.config({
    //开发专用，阻止浏览器缓存
    urlArgs: "v=" + Date.now(),
    shim: {
        easyTabs: {
            deps: ['jquery'],
            exports: "easyTabs"
        }
    },
    paths: {
        jquery: [
            //'http://libs.baidu.com/jquery/1.10.2/jquery'
            '../lib/jquery'
        ]
        ,
        easyTabs: '../lib/jquery.easytabs'
    }
});

require(['sort','hello','addBg','tab'],function(req_sort,req_hello,req_addBg){
    var arrs = [7,3,1,24,65,5];
    console.log(arrs.sort(req_sort.sortWay));
    console.log(req_sort.exportUrl());
    req_hello();
})

