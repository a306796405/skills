require.config({
    baseUrl: 'js',
    paths: {
        jquery: [
            '../lib/jquery'
        ]
    }
});

define(['sendMsg'],function(msg){
    console.log(msg);
})
