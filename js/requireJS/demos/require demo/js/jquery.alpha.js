define(['jquery'],function(){

    $.fn.alpha = function() {
        return this.append('<p>Alpha is Go!</p>');
    };

    $(function(){
        $('#req-button-two').append('<p><input type="button" value="button" name="yy"/></p>');

    })

});


/*注释请看jquery.beta*/
