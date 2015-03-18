/*main.js中就两个函数调用require.config和require。*/

/*require配置：定义js文件路径*/
require.config({
    baseUrl: 'js'

    /*paths参数，用来映射模块别名。requirejs2.0更加强大，可以配置为一个数组，
     顺序映射。当前面的路径没有成功载入时可接着使用后面的路径。如下
     enforceDefine: true,
     paths: {
     jquery: [
     'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',  (jquery路径一)
     'lib/jquery'  (jquery备用路径)
     ]
     }
     require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，
     还有一个shim属性，专门用来配置不兼容的模块（插件）。具体来说，每个模块要定义
     （1）exports值（输出的变量名），表明这个模块外部调用时的名称；
     （2）deps数组，表明该模块的依赖性。
     shim: {
     　　　　'jquery.scroll': {    (path中定义的别名)
     　　　　　　deps: ['jquery'],  （声明依赖的文件）
     　　　　　　exports: 'jQuery.fn.scroll'  （定义外部调用时的名称）
     　　　　}

     　　}*/
});

/*require 引进js文件并执行*/
require(["jquery","jquery.alpha","jquery.beta"],function($,a,b){
    $(function(){
        alert($().jquery);
        b.test();
        $('#req-button-one').alpha().beta();

    });
});