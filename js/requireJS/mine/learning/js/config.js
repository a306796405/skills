/**
 * Created by jianglinjie on 15/2/6.
 */

requirejs.config({
    shim: {
        hello: {
            /**
             * 针对多个非AMD function
             * */
            /*init: function(){
                return{
                    hello_1: hello_1,
                    hello_2: hello_2
                }
            }*/
            /**
             * 针对单个非AMD function
             * */
            exports: "hello"
         }
    },
    paths: {
        //jquery : '../../lib/jquery',
        //jquery : [
        //    'http://libs.baidu.com/jquery/2.0.0/jquery.js',
        //    '../../lib/jquery'
        //],
        jquery: [
            'http://libs.baidu.com/jquery/1.10.2/jquery',
            '../lib/jquery'
        ],
        'jquery.ui.core' : '../lib/jquery-ui-1.10.4.custom/development-bundle/ui/jquery.ui.core',
        'jquery.ui.widget' : '../lib/jquery-ui-1.10.4.custom/development-bundle/ui/jquery.ui.widget',
        'jquery.ui.mouse' : '../lib/jquery-ui-1.10.4.custom/development-bundle/ui/jquery.ui.mouse',
        'jquery.ui.slider' : '../lib/jquery-ui-1.10.4.custom/development-bundle/ui/jquery.ui.slider'
    }
});



