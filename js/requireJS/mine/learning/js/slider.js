/**
 * Created by jianglinjie on 15/2/6.
 */
define(
    ['jquery','jquery.ui.core','jquery.ui.widget','jquery.ui.mouse','jquery.ui.slider'],
    function($,core,widget,mouse,slider){
    $(function(){
        $("#slider").slider(
            {
                animate: true ,
                max:80,
                min:18,
                range:true,
                orientation: 'auto',
                slide:function(event, ui) {
                    $("#age").val( ui.values[0]+"::"+ui.values[1] );
                }
            });
    });
})
