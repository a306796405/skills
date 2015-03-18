/*定义函数define, 引入插件（引入插件共有两种方法，
 1.main.js-shim中配置（异步加载成一个模块），
 2.define中加入数组如下：['jquery','jquery-dialog']）
 <===============================>
 该函数用户创建模块。每个模块拥有一个唯一的模块ID，
 它被用于RequireJS的运行时函数，define函数是一个全局函数，
 不需要使用requirejs命名空间.
 <===============================>*/
define(['jquery'],function(){

    $.fn.beta = function() {
        return this.append('<p>Beta is Go!</p>');
    };

    $(function(){
        console.log("init beta");
        $("input[type=button][name='yy']").bind("click", function(){
            $('#req-button-one').removeClass('yubi_gc');
            sayHey();
        });
    })

    return {
        test: function(){
            console.log("test success");
        }
    }
});

function sayHey(){
    alert("Hey-reuqireJs");
}


