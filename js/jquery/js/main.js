require.config({
    baseUrl: 'js',
    paths: {
        jquery: '../lib/fakeJquery'
    }
})

require(["jquery"],function($){
    $('.btn-hide').click(function(){
        $('img').hide();
        $('.btn-hide').css({backgroundColor: "red",width: '100px'});
    })
    $('.btn-show').click(function(){
        $('img').show();
        $('.btn-show').css({backgroundColor: "red",width: '100px'});
    })
});