require.config({
    baseUrl: 'js',
    paths: {
        jquery: [
            '../lib/jquery'
        ]
    }
});

require(['jquery','sendMsg'],function($,msg){
    $('h1').html(msg);
})

