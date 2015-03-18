require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'http://cdn.bootcss.com/jquery/1.11.1/jquery.min',
        'jquery.easings': 'jquery.easings.min',
        'jquery.fullpage': 'jquery.fullPage.min',
        'BaiduMap': 'BaiduMap',
        'jquery.slimscroll': 'jquery.slimscroll.min'
    },
    shim: {
        'jquery.fullpage': {
            deps: ['jquery','jquery.easings']
        }
    }
})

require(['jquery.fullpage','BaiduMap'],function(fullpage,BaiduMap){
    $('#step_wrap').fullpage();
})