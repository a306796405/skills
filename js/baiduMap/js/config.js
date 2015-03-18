require.config({
    baseUrl: './js',
    paths: {
        'jquery': 'http://cdn.bootcss.com/jquery/1.11.1/jquery.min',
        'map': 'map'
    }
});

require(['map'], function( map ){

    //BaidMap
    map();
});